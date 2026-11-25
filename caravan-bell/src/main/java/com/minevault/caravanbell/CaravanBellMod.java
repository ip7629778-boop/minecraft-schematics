package com.minevault.caravanbell;

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.event.lifecycle.v1.ServerTickEvents;
import net.fabricmc.fabric.api.event.player.UseBlockCallback;
import net.fabricmc.fabric.api.event.player.UseEntityCallback;
import net.fabricmc.fabric.api.event.player.UseItemCallback;
import net.minecraft.core.component.DataComponents;
import net.minecraft.core.particles.ParticleTypes;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.entity.npc.Villager;
import net.minecraft.world.entity.npc.VillagerData;
import net.minecraft.world.entity.npc.VillagerProfession;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.component.ItemLore;
import net.minecraft.world.level.block.Blocks;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class CaravanBellMod implements ModInitializer {
    public static final String MOD_ID = "caravanbell";
    public static final Logger LOGGER = LoggerFactory.getLogger("CaravanBell");

    @Override
    public void onInitialize() {
        LOGGER.info("[Caravan Bell] Initializing Villager Logistics & Caravan system for 1.21.4...");

        // 1. Entity Interaction (Lead on Villager + Trade Contract Signing)
        UseEntityCallback.EVENT.register((player, level, hand, entity, hitResult) -> {
            if (!(entity instanceof Villager villager)) {
                return InteractionResult.PASS;
            }

            ItemStack held = player.getItemInHand(hand);

            // A: Direct Leash on Villager
            if (held.is(Items.LEAD)) {
                if (!level.isClientSide() && !villager.isLeashed()) {
                    villager.setLeashedTo(player, true);
                    if (!player.getAbilities().instabuild) {
                        held.shrink(1);
                    }
                    level.playSound(null, villager.blockPosition(), SoundEvents.LEASH_KNOT_PLACE, SoundSource.NEUTRAL, 1.0f, 1.0f);
                    ((ServerLevel) level).sendParticles(ParticleTypes.HAPPY_VILLAGER, villager.getX(), villager.getY() + 1.2, villager.getZ(), 6, 0.2, 0.2, 0.2, 0.05);
                    player.displayClientMessage(Component.literal("§a✔ Villager leashed! Lead them anywhere safely."), true);
                }
                return InteractionResult.SUCCESS;
            }

            // B: Apprenticeship Trade Contract (Sneak + Right-Click with Paper)
            if (held.is(Items.PAPER) && player.isShiftKeyDown()) {
                if (!level.isClientSide()) {
                    VillagerData data = villager.getVillagerData();
                    VillagerProfession prof = data.getProfession();

                    if (prof != VillagerProfession.NONE && prof != VillagerProfession.NITWIT) {
                        // Permanently lock profession by ensuring XP >= 1
                        if (villager.getVillagerXp() == 0) {
                            villager.setVillagerXp(1);
                        }

                        if (!player.getAbilities().instabuild) {
                            held.shrink(1);
                            ItemStack contract = new ItemStack(Items.PAPER);
                            String profKey = prof.name();
                            String profName = profKey.substring(0, 1).toUpperCase() + profKey.substring(1).toLowerCase();
                            contract.set(DataComponents.CUSTOM_NAME, Component.literal("§6Trade Contract: §e" + profName));

                            String workerName = villager.hasCustomName() ? villager.getCustomName().getString() : ("Village " + profName);
                            List<Component> lore = List.of(
                                Component.literal("§7Worker: §f" + workerName),
                                Component.literal("§a✔ Permanent Profession Locked"),
                                Component.literal("§8Sealed with Caravan Bell Mod")
                            );
                            contract.set(DataComponents.LORE, new ItemLore(lore));

                            if (!player.getInventory().add(contract)) {
                                player.drop(contract, false);
                            }
                        }

                        level.playSound(null, villager.blockPosition(), SoundEvents.UI_CARTOGRAPHY_TABLE_TAKE_RESULT, SoundSource.NEUTRAL, 1.0f, 1.1f);
                        level.playSound(null, villager.blockPosition(), SoundEvents.VILLAGER_YES, SoundSource.NEUTRAL, 1.0f, 1.0f);
                        ((ServerLevel) level).sendParticles(ParticleTypes.HAPPY_VILLAGER, villager.getX(), villager.getY() + 1.2, villager.getZ(), 10, 0.3, 0.3, 0.3, 0.1);

                        String profName = prof.name().substring(0, 1).toUpperCase() + prof.name().substring(1).toLowerCase();
                        player.displayClientMessage(Component.literal("§6📜 Trade Contract sealed! §e" + profName + " §6permanently locked."), true);
                    } else if (prof == VillagerProfession.NONE) {
                        player.displayClientMessage(Component.literal("§c✖ Villager has no profession yet. Place a workstation first!"), true);
                    } else {
                        player.displayClientMessage(Component.literal("§c✖ Nitwit villagers cannot sign trade contracts."), true);
                    }
                }
                return InteractionResult.SUCCESS;
            }

            return InteractionResult.PASS;
        });

        // 2. Handheld Bell Ringing (Rally Caravan / Dismiss)
        UseItemCallback.EVENT.register((player, level, hand) -> {
            ItemStack held = player.getItemInHand(hand);
            if (held.is(Items.BELL)) {
                if (!level.isClientSide() && player instanceof ServerPlayer serverPlayer) {
                    if (player.isShiftKeyDown()) {
                        CaravanManager.dismissCaravan(serverPlayer);
                    } else {
                        CaravanManager.rallyCaravan(serverPlayer);
                    }
                }
                return InteractionResult.SUCCESS;
            }
            return InteractionResult.PASS;
        });

        // 3. Placed Village Bell Ringing (Also rallies caravan!)
        UseBlockCallback.EVENT.register((player, level, hand, hitResult) -> {
            if (level.getBlockState(hitResult.getBlockPos()).is(Blocks.BELL)) {
                if (!level.isClientSide() && player instanceof ServerPlayer serverPlayer && !player.isShiftKeyDown()) {
                    CaravanManager.rallyCaravan(serverPlayer);
                }
            }
            return InteractionResult.PASS;
        });

        // 4. Server Tick for Following Caravan Navigation
        ServerTickEvents.END_SERVER_TICK.register(CaravanManager::tick);

        LOGGER.info("[Caravan Bell] Ready! Lead, rally, and contract your villagers.");
    }
}
