package com.minevault.caravanbell.mixin;

import net.minecraft.world.entity.npc.AbstractVillager;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

@Mixin(AbstractVillager.class)
public abstract class AbstractVillagerMixin {
    /**
     * In vanilla Minecraft Java Edition, AbstractVillager overrides canBeLeashed() to false.
     * Overriding this to true enables direct leashing with Lead items and tying to fence posts,
     * matching Bedrock edition behavior and solving the villager transport agony!
     */
    @Inject(method = "canBeLeashed", at = @At("HEAD"), cancellable = true)
    private void caravanbell$canBeLeashed(CallbackInfoReturnable<Boolean> cir) {
        cir.setReturnValue(true);
    }
}
