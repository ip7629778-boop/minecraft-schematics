package com.minevault.smartstash.network;

import com.minevault.smartstash.SmartStashMod;
import net.minecraft.network.RegistryFriendlyByteBuf;
import net.minecraft.network.codec.ByteBufCodecs;
import net.minecraft.network.codec.StreamCodec;
import net.minecraft.network.protocol.common.custom.CustomPacketPayload;
import net.minecraft.resources.ResourceLocation;

public record QuickStackPayload(boolean includeHotbar) implements CustomPacketPayload {
    public static final Type<QuickStackPayload> TYPE = new Type<>(ResourceLocation.fromNamespaceAndPath(SmartStashMod.MOD_ID, "quick_stack"));

    public static final StreamCodec<RegistryFriendlyByteBuf, QuickStackPayload> STREAM_CODEC = StreamCodec.composite(
        ByteBufCodecs.BOOL,
        QuickStackPayload::includeHotbar,
        QuickStackPayload::new
    );

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
