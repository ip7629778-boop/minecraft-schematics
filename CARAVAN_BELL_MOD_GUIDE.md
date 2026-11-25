# The Caravan Bell & Contract (Fabric 1.21.4)
### Complete User Guide, Controls & Mechanics

**The Caravan Bell & Contract** is a lightweight, 100% vanilla-safe Quality-of-Life mod for Minecraft 1.21.4 engineered to solve the most hated chore in the game: **villager transport and workstation linking chaos**.

---

## 🎯 The Pain Points Solved

1. **No More Boats on Land**: Pushing villagers in boats across hills at 1 block per 2 seconds is over.
2. **No More Minecart Rail Networks**: Never waste hundreds of iron ingots on rails just to move 3 villagers.
3. **No More Workstation Chaos**: Villagers randomly losing their profession or stealing each other's workstations across 40 blocks is prevented with Trade Contracts.
4. **100% Vanilla Safe**: No weird block entities or unremovable data. If you ever uninstall the mod, your world will NEVER corrupt or crash, and all villagers stay right where they are.

---

## 🔔 Core Gameplay Mechanics

### 1. Direct Villager Leashing (Lead on Villager)
*In vanilla Minecraft Java Edition, villagers cannot be leashed.*

- **How to Use**: Hold a standard **Lead** (`minecraft:lead`) and **Right-Click** any Villager.
- **Result**: The villager is immediately leashed to you!
- **Leading & Running**: The villager happily walks, runs, and jumps behind you.
- **Fence Tying**: Right-click any **Fence** post while holding the leash to tie the villager safely to the fence while you build their trading booth or house!
- **Unleash**: Right-click the villager or break the fence knot to detach the lead.

---

### 2. The Caravan Bell (Handheld Group March)
*Need to move an entire village or 5 villagers at once into your new trading hall?*

- **How to Rally (Group Follow)**:
  - Hold any **Bell** (`minecraft:bell`) in your main or off-hand.
  - **Right-Click** (in air or on ground).
  - The bell rings with an inspiring resonant chime.
  - All villagers within **16 blocks** burst into emerald happy particles and enter **Caravan Mode**.
  - They turn toward you and enthusiastically march behind you in an orderly line at `1.25x` speed.
  - If you pause or reach within 3 blocks, they stop patiently without shoving or bumping you.
- **How to Dismiss & Settle**:
  - Once your villagers are inside their stalls or rooms:
  - **Sneak + Right-Click** with the Bell in hand.
  - A gentle dismissal chime plays, their pathfinding settles, and an actionbar notification confirms:
    `🔕 Caravan dismissed (X villagers settled).`
- **Village Bell Ringing**:
  - Right-clicking a placed Bell block inside a village also rings the rally chime and gathers villagers!

---

### 3. The Apprenticeship Trade Contract (Parchment Lock)
*Tired of rolling the perfect Mending book only for the villager to lose their job before you can trade?*

- **How to Sign**:
  - Hold a sheet of **Paper** (`minecraft:paper`) in your hand.
  - **Sneak + Right-Click (Shift + Right-Click)** on any employed villager (Librarian, Armorer, Fletcher, Farmer, Cleric, etc.).
- **What Happens**:
  - The villager's trade level and profession are **permanently locked** into the world's save state (even if you remove their workstation block!).
  - Consumes 1 Paper and stamps a special parchment item into your inventory:
    - **Item**: `Trade Contract: [Profession]`
    - **Lore**: Worker Name, "Permanent Profession Locked", "Sealed with Caravan Bell Mod"
  - Spawns emerald sparkles and cartography seal sounds.
  - Actionbar confirms: `📜 Trade Contract sealed! Profession permanently locked.`

---

## 🛠️ Survival Bell Crafting Recipe

Can't find a village to steal a bell from? You can craft a Bell right on your crafting table:

```
[ S ]       S = Wooden Stick
[GBG]       G = Gold Ingot
[ G ]       B = Gold Block
```
*Outputs: 1x Vanilla Bell (`minecraft:bell`)*

---

## 📦 Technical Specifications

| Property | Value |
| :--- | :--- |
| **Mod ID** | `caravanbell` |
| **Mod Version** | `1.0.0` |
| **Minecraft Version** | `1.21.4` |
| **Loader** | `Fabric >= 0.16.0` (Verified on 0.17.2 & 0.20+) |
| **Dependencies** | `Fabric API 0.119.4+1.21.4` |
| **Environment** | Client & Server (Singleplayer, LAN & Multiplayer) |
| **File Size** | `15.3 KB` |
| **File Path** | `downloads/caravanbell-fabric-1.21.4-1.0.0.jar` |

---

## 💡 Quick Tips for Trading Halls

1. **Building a 10-Villager Trading Hall**:
   - Ring the handheld bell in the village.
   - Walk into your trading hall corridor — all 10 villagers will walk right inside behind you.
   - Lead each one into their 1x1 booth using a **Lead**.
   - Place a lectern, roll your desired enchantment, and immediately **Shift+Right-Click with Paper** to seal their trade contract permanently!
