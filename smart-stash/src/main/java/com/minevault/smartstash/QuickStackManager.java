package com.minevault.smartstash;

import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.CompoundContainer;
import net.minecraft.world.Container;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.ChestBlock;
import net.minecraft.world.level.block.entity.BarrelBlockEntity;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.ChestBlockEntity;
import net.minecraft.world.level.block.entity.ShulkerBoxBlockEntity;
import net.minecraft.world.level.block.state.BlockState;

import java.util.*;

public class QuickStackManager {
    public static final int SCAN_RADIUS = 8;

    public static void performQuickStack(ServerPlayer player, boolean includeHotbar) {
        Level level = player.level();
        BlockPos playerPos = player.blockPosition();
        Inventory playerInv = player.getInventory();

        Set<Container> containers = new LinkedHashSet<>();
        Set<BlockPos> visitedPositions = new HashSet<>();

        int minX = playerPos.getX() - SCAN_RADIUS;
        int maxX = playerPos.getX() + SCAN_RADIUS;
        int minY = Math.max(level.getMinY(), playerPos.getY() - SCAN_RADIUS);
        int maxY = Math.min(level.getMaxY(), playerPos.getY() + SCAN_RADIUS);
        int minZ = playerPos.getZ() - SCAN_RADIUS;
        int maxZ = playerPos.getZ() + SCAN_RADIUS;

        for (int x = minX; x <= maxX; x++) {
            for (int y = minY; y <= maxY; y++) {
                for (int z = minZ; z <= maxZ; z++) {
                    BlockPos pos = new BlockPos(x, y, z);
                    if (visitedPositions.contains(pos)) continue;

                    BlockState state = level.getBlockState(pos);
                    BlockEntity be = level.getBlockEntity(pos);

                    if (be instanceof ChestBlockEntity && state.getBlock() instanceof ChestBlock chestBlock) {
                        visitedPositions.add(pos);
                        Container container = ChestBlock.getContainer(chestBlock, state, level, pos, true);
                        if (container != null && container.stillValid(player)) {
                            containers.add(container);
                        }
                    } else if (be instanceof BarrelBlockEntity || be instanceof ShulkerBoxBlockEntity) {
                        visitedPositions.add(pos);
                        Container container = (Container) be;
                        if (container.stillValid(player)) {
                            containers.add(container);
                        }
                    }
                }
            }
        }

        if (containers.isEmpty()) {
            player.displayClientMessage(Component.translatable("message.smartstash.no_chests"), true);
            player.playNotifySound(SoundEvents.DISPENSER_FAIL, SoundSource.PLAYERS, 0.4f, 1.4f);
            return;
        }

        int totalItemsStacked = 0;
        Set<Container> affectedContainers = new HashSet<>();

        // Main inventory: slots 9 to 35
        // Hotbar: slots 0 to 8
        int startSlot = includeHotbar ? 0 : 9;
        int endSlot = 36;

        for (Container container : containers) {
            boolean containerChanged = false;

            for (int slot = startSlot; slot < endSlot; slot++) {
                ItemStack playerStack = playerInv.getItem(slot);
                if (playerStack.isEmpty()) continue;

                // Check if this container already holds this item type
                if (!containerHasMatchingItem(container, playerStack)) {
                    continue;
                }

                // 1. First pass: Merge into existing stacks with room
                for (int cSlot = 0; cSlot < container.getContainerSize(); cSlot++) {
                    ItemStack cStack = container.getItem(cSlot);
                    if (!cStack.isEmpty() && ItemStack.isSameItemSameComponents(playerStack, cStack)) {
                        int maxCount = Math.min(container.getMaxStackSize(), cStack.getMaxStackSize());
                        int space = maxCount - cStack.getCount();
                        if (space > 0) {
                            int toMove = Math.min(space, playerStack.getCount());
                            cStack.grow(toMove);
                            playerStack.shrink(toMove);
                            totalItemsStacked += toMove;
                            containerChanged = true;
                            if (playerStack.isEmpty()) break;
                        }
                    }
                }

                // 2. Second pass: Place remaining in empty slot if container already had the item
                if (!playerStack.isEmpty()) {
                    for (int cSlot = 0; cSlot < container.getContainerSize(); cSlot++) {
                        ItemStack cStack = container.getItem(cSlot);
                        if (cStack.isEmpty()) {
                            int maxCount = Math.min(container.getMaxStackSize(), playerStack.getMaxStackSize());
                            int toMove = Math.min(maxCount, playerStack.getCount());
                            ItemStack newCStack = playerStack.split(toMove);
                            container.setItem(cSlot, newCStack);
                            totalItemsStacked += toMove;
                            containerChanged = true;
                            if (playerStack.isEmpty()) break;
                        }
                    }
                }

                if (playerStack.isEmpty()) {
                    playerInv.setItem(slot, ItemStack.EMPTY);
                }
            }

            if (containerChanged) {
                container.setChanged();
                affectedContainers.add(container);
            }
        }

        if (totalItemsStacked > 0) {
            player.inventoryMenu.broadcastChanges();
            player.playNotifySound(SoundEvents.CHEST_CLOSE, SoundSource.PLAYERS, 0.7f, 1.25f);
            player.displayClientMessage(
                Component.translatable("message.smartstash.stacked", totalItemsStacked, affectedContainers.size()),
                true
            );
        } else {
            player.displayClientMessage(Component.translatable("message.smartstash.none"), true);
            player.playNotifySound(SoundEvents.DISPENSER_FAIL, SoundSource.PLAYERS, 0.4f, 1.4f);
        }
    }

    private static boolean containerHasMatchingItem(Container container, ItemStack playerStack) {
        for (int i = 0; i < container.getContainerSize(); i++) {
            ItemStack c = container.getItem(i);
            if (!c.isEmpty() && ItemStack.isSameItemSameComponents(playerStack, c)) {
                return true;
            }
        }
        return false;
    }
}
