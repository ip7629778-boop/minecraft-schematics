package com.minevault.smartstash.client;

import com.minevault.smartstash.network.QuickStackPayload;
import com.mojang.blaze3d.platform.InputConstants;
import net.fabricmc.api.ClientModInitializer;
import net.fabricmc.fabric.api.client.event.lifecycle.v1.ClientTickEvents;
import net.fabricmc.fabric.api.client.keybinding.v1.KeyBindingHelper;
import net.fabricmc.fabric.api.client.networking.v1.ClientPlayNetworking;
import net.minecraft.client.KeyMapping;
import net.minecraft.client.gui.screens.Screen;
import org.lwjgl.glfw.GLFW;

public class SmartStashClient implements ClientModInitializer {
    public static KeyMapping quickStackKey;

    @Override
    public void onInitializeClient() {
        quickStackKey = KeyBindingHelper.registerKeyBinding(new KeyMapping(
            "key.smartstash.quick_stack",
            InputConstants.Type.KEYSYM,
            GLFW.GLFW_KEY_X,
            "key.categories.smartstash"
        ));

        ClientTickEvents.END_CLIENT_TICK.register(client -> {
            while (quickStackKey.consumeClick()) {
                if (client.player != null && ClientPlayNetworking.canSend(QuickStackPayload.TYPE)) {
                    boolean includeHotbar = Screen.hasShiftDown();
                    ClientPlayNetworking.send(new QuickStackPayload(includeHotbar));
                }
            }
        });
    }
}
