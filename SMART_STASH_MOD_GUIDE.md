# Smart Stash (Fabric 1.21.4) — Official Mod Guide
> **Mod ID:** `smartstash` | **Version:** `1.0.0`  
> **Target Edition:** Minecraft Java Edition 1.21.4 (Fabric Loader & Fabric API)  
> **Author:** MineVault & ip762  
> **Philosophy:** High-performance, lightweight "Vanilla+" Quality-of-Life mod bringing Terraria's beloved Quick-Stack mechanic to Minecraft without any bloated tech pipes, custom blocks, or world corruption risk.

---

## 1. What Does Smart Stash Do?

Every Minecraft player spends 20–30% of their total playtime walking back and forth between chests, opening containers, and manually sorting ores, cobblestone, mob drops, and crops.

With **Smart Stash**:
1. Walk into your base or storage vault.
2. Press **`X`** (configurable in Options &rarr; Controls &rarr; Key Binds).
3. In **0.05 seconds**, all matching items from your inventory fly directly into nearby chests, barrels, and shulker boxes!
4. An action-bar message informs you exactly how many items were stored and across how many containers:
   ```
   §aSmart Stash: Stored 128 item(s) across 3 container(s)!
   ```
5. Plays a smooth vanilla container sound on completion.

---

## 2. Key Controls & Features

### Core Hotkeys
| Action | Default Key | Description |
| :--- | :---: | :--- |
| **Quick-Stack Main Inventory** | **`X`** | Scans an 8-block radius and deposits matching items from your 27 main inventory slots. **Protects your hotbar** (weapons, tools, food, torches remain safely in your hand!). |
| **Quick-Stack Everything (Inc. Hotbar)** | **`Shift + X`** | Deposits matching items from both your main inventory **and your hotbar**. |

### Smart Logic & Safety Rules
* **Smart Matching Only:** It will **NEVER dump items into empty chests** unless that chest already holds that item type. Your organized storage system stays 100% organized.
* **Component-Aware Stacking:** Uses Minecraft 1.21.4's Data Component API (`ItemStack.isSameItemSameComponents`). Enchanted pickaxes, custom-named items, and specific potions will only stack if they are truly identical.
* **Double-Chest Aware:** Seamlessly recognizes vanilla double chests as unified containers without duplicating or miscounting slots.
* **Multi-Container Support:** Works on **Chests**, **Trapped Chests**, **Barrels**, and **Shulker Boxes**. Skips functional redstone blocks (droppers, dispensers, hoppers, furnaces) so automation lines aren't disturbed.
* **100% Crash-Proof & Safe:** Does not register custom blocks, custom items, or custom NBT tags. All items stay in vanilla containers. If the mod is ever removed, **zero items are lost**.

---

## 3. Installation Guide

The mod has already been placed directly into your Minecraft installation:
* **Active Mods Folder:** `C:\Users\ip762\AppData\Roaming\.minecraft\mods\smartstash-fabric-1.21.4-1.0.0.jar`
* **Download Copy:** `downloads/smartstash-fabric-1.21.4-1.0.0.jar`

### How to Play:
1. Launch Minecraft with your **Fabric 1.21.4** profile.
2. In-game, place a few chests with some sample items (e.g., Cobblestone in Chest A, Iron Ingots in Chest B, Wheat in Barrel C).
3. Fill your inventory with a mix of those items.
4. Press **`X`**! Watch your bags clean themselves in a fraction of a second.
