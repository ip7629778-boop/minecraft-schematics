package com.minevault.caravanbell;

import net.minecraft.core.particles.ParticleTypes;
import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.entity.npc.Villager;
import net.minecraft.world.item.Items;
import net.minecraft.world.phys.AABB;

import java.util.*;

public class CaravanManager {
    public static class CaravanData {
        public final long expireTick;
        public final Set<UUID> villagerUuids;
        public int ticksWithoutBell = 0;

        public CaravanData(long expireTick, Set<UUID> villagerUuids) {
            this.expireTick = expireTick;
            this.villagerUuids = villagerUuids;
        }
    }

    private static final Map<UUID, CaravanData> ACTIVE_CARAVANS = new HashMap<>();

    public static void rallyCaravan(ServerPlayer player) {
        ServerLevel level = player.serverLevel();
        AABB searchBox = player.getBoundingBox().inflate(16.0);
        List<Villager> nearbyVillagers = level.getEntitiesOfClass(Villager.class, searchBox, v -> v.isAlive() && !v.isSleeping());

        if (nearbyVillagers.isEmpty()) {
            level.playSound(null, player.blockPosition(), SoundEvents.NOTE_BLOCK_BELL.value(), SoundSource.PLAYERS, 0.8f, 0.7f);
            player.displayClientMessage(Component.literal("§7🔔 Bell echoed... no villagers nearby (16 block range)."), true);
            return;
        }

        Set<UUID> villagerUuids = new HashSet<>();
        for (Villager v : nearbyVillagers) {
            villagerUuids.add(v.getUUID());
            level.sendParticles(ParticleTypes.HAPPY_VILLAGER, v.getX(), v.getY() + 1.2, v.getZ(), 6, 0.25, 0.25, 0.25, 0.05);
            level.playSound(null, v.blockPosition(), SoundEvents.VILLAGER_YES, SoundSource.NEUTRAL, 0.9f, 0.95f + level.random.nextFloat() * 0.1f);
            v.getNavigation().moveTo(player, 1.25);
            v.getLookControl().setLookAt(player, 30.0f, 30.0f);
        }

        long expire = level.getGameTime() + 1200L; // 60 seconds
        ACTIVE_CARAVANS.put(player.getUUID(), new CaravanData(expire, villagerUuids));

        level.playSound(null, player.blockPosition(), SoundEvents.BELL_RESONATE, SoundSource.PLAYERS, 1.2f, 1.0f);
        level.playSound(null, player.blockPosition(), SoundEvents.NOTE_BLOCK_BELL.value(), SoundSource.PLAYERS, 1.0f, 1.5f);
        level.sendParticles(ParticleTypes.HAPPY_VILLAGER, player.getX(), player.getY() + 1.5, player.getZ(), 10, 0.4, 0.4, 0.4, 0.05);

        player.displayClientMessage(Component.literal("§a🔔 Caravan rallied! §f" + nearbyVillagers.size() + " §avillager(s) following your lead. [Shift+Right-Click to dismiss]"), true);
    }

    public static void dismissCaravan(ServerPlayer player) {
        CaravanData data = ACTIVE_CARAVANS.remove(player.getUUID());
        ServerLevel level = player.serverLevel();

        int count = 0;
        if (data != null) {
            for (UUID uid : data.villagerUuids) {
                if (level.getEntity(uid) instanceof Villager v && v.isAlive()) {
                    v.getNavigation().stop();
                    level.sendParticles(ParticleTypes.HAPPY_VILLAGER, v.getX(), v.getY() + 1.2, v.getZ(), 3, 0.2, 0.2, 0.2, 0.05);
                    count++;
                }
            }
        }

        level.playSound(null, player.blockPosition(), SoundEvents.NOTE_BLOCK_CHIME.value(), SoundSource.PLAYERS, 1.0f, 0.85f);
        player.displayClientMessage(Component.literal("§e🔕 Caravan dismissed (" + count + " villagers settled)."), true);
    }

    public static void tick(MinecraftServer server) {
        if (ACTIVE_CARAVANS.isEmpty()) return;

        Iterator<Map.Entry<UUID, CaravanData>> it = ACTIVE_CARAVANS.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<UUID, CaravanData> entry = it.next();
            UUID playerUuid = entry.getKey();
            CaravanData data = entry.getValue();

            ServerPlayer player = server.getPlayerList().getPlayer(playerUuid);
            if (player == null || !player.isAlive()) {
                it.remove();
                continue;
            }

            ServerLevel level = player.serverLevel();
            long gameTime = level.getGameTime();
            if (gameTime > data.expireTick) {
                it.remove();
                player.displayClientMessage(Component.literal("§7🔕 Caravan march ended. Villagers returned to wandering."), true);
                continue;
            }

            boolean holdingBell = player.getMainHandItem().is(Items.BELL) || player.getOffhandItem().is(Items.BELL);
            if (!holdingBell) {
                data.ticksWithoutBell++;
                if (data.ticksWithoutBell > 100) { // 5 second grace period
                    it.remove();
                    dismissCaravan(player);
                    continue;
                }
            } else {
                data.ticksWithoutBell = 0;
            }

            Iterator<UUID> villagerIt = data.villagerUuids.iterator();
            while (villagerIt.hasNext()) {
                UUID vUid = villagerIt.next();
                if (level.getEntity(vUid) instanceof Villager v && v.isAlive() && !v.isSleeping()) {
                    double distSq = v.distanceToSqr(player);
                    if (distSq > 784.0) { // > 28 blocks
                        villagerIt.remove();
                        v.getNavigation().stop();
                        continue;
                    }

                    if (distSq > 9.0) { // > 3 blocks
                        v.getNavigation().moveTo(player, 1.25);
                        v.getLookControl().setLookAt(player, 30.0f, 30.0f);
                    } else {
                        v.getNavigation().stop();
                        v.getLookControl().setLookAt(player, 15.0f, 15.0f);
                    }

                    if (gameTime % 40 == 0) {
                        level.sendParticles(ParticleTypes.HAPPY_VILLAGER, v.getX(), v.getY() + 1.2, v.getZ(), 1, 0.1, 0.1, 0.1, 0.02);
                    }
                } else {
                    villagerIt.remove();
                }
            }

            if (data.villagerUuids.isEmpty()) {
                it.remove();
            }
        }
    }
}
