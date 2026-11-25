package com.minevault.smartstash;

import com.minevault.smartstash.network.QuickStackPayload;
import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.networking.v1.PayloadTypeRegistry;
import net.fabricmc.fabric.api.networking.v1.ServerPlayNetworking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SmartStashMod implements ModInitializer {
    public static final String MOD_ID = "smartstash";
    public static final Logger LOGGER = LoggerFactory.getLogger("SmartStash");

    @Override
    public void onInitialize() {
        LOGGER.info("[Smart Stash] Initializing Terraria-style Quick-Deposit system for Minecraft 1.21.4...");

        // Register custom packet payload
        PayloadTypeRegistry.playC2S().register(QuickStackPayload.TYPE, QuickStackPayload.STREAM_CODEC);

        // Register server packet receiver
        ServerPlayNetworking.registerGlobalReceiver(QuickStackPayload.TYPE, (payload, context) -> {
            context.server().execute(() -> {
                QuickStackManager.performQuickStack(context.player(), payload.includeHotbar());
            });
        });

        LOGGER.info("[Smart Stash] Ready to organize!");
    }
}
