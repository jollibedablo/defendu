# Defendu Mobile

React Native (Expo) app for Defendu—TypeScript, Metro, and MVC structure. Run with **Expo Go** on your phone.

## Tech stack

- **Expo** + **React Native** (Metro bundler)
- **TypeScript** / **TSX**
- **MVC**: `src/models`, `src/views` (screens + components), `src/controllers`
- **Expo Go** for development (no custom native build required)

## Run on your phone

1. **Install Expo Go** on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)).

2. **Start the app** (from the project root):
   ```bash
   npm start
   ```
   You’ll be asked: **Run as tunnel? (y/n, default n)**  
   - **n** (or Enter): normal LAN mode. Phone and PC must be on the same Wi‑Fi.  
   - **y**: tunnel mode. Uses Expo’s tunnel so the phone can reach your PC over the internet (avoids firewall/Wi‑Fi issues). First time may install `@expo/ngrok`; then scan the new QR code.

3. **Open in Expo Go**  
   - Android: scan the QR code from the terminal with Expo Go.  
   - iOS: scan the QR code with the Camera app, then open in Expo Go.

### Other scripts

| Command | Description |
|--------|-------------|
| `npm run android` | Start and open on Android device/emulator |
| `npm run ios` | Start and open on iOS simulator |
| `npm run web` | Start web version (Expo web) |
| `npm run start:tunnel` | Start with tunnel (no prompt) |
| `npm run start:lan` | Start with fixed LAN hostname (see `start-lan.ps1` for context) |

## Project structure

```
src/
  models/       # Types and interfaces (e.g. auth, navigation)
  views/        # UI only
    screens/    # StartupScreen, LoginScreen, …
    components/ # Toast, …
  controllers/ # Business logic (AuthController, useToast, …)
api/            # Optional API / test server scripts (.js allowed here)
scripts/        # Dev scripts (e.g. start.js for tunnel prompt)
```

Entry: `index.tsx` → `App.tsx` (Metro resolves from `main` in `package.json`).

## Test server (connectivity from phone to PC)

To check that your phone can reach your PC (e.g. for a future “Server URL” or API):

1. **Start the test server** on your PC (in a separate terminal):
   ```bash
   node api/test-server.js
   ```
   It listens on port **8082** on all interfaces. Leave it running.

2. On your phone, use your PC’s IP (e.g. `http://192.168.254.108:8082`) in your app when you add a “Server URL” or API base URL.  
   - **Windows:** `ipconfig` → IPv4 under your Wi‑Fi adapter.  
   - **Mac:** System Settings → Wi‑Fi → your network → IP address.

3. If the app still can’t reach the PC, use **tunnel mode** (`y` when `npm start` asks, or `npm run start:tunnel`) so the phone connects over the internet. For the test server over a tunnel you’d use something like `npx localtunnel --port 8082` (or `npm run tunnel`) and the URL it prints.

### Firewall (Windows)

If the phone can’t reach the test server on your PC:

1. When you run `node api/test-server.js`, if Windows shows a **Firewall** prompt, choose **Allow access** (Private networks).
2. Or allow Node manually: **Windows Defender Firewall** → Allow an app → add `node.exe` (e.g. `C:\Program Files\nodejs\node.exe`), Private.
3. Or open the port explicitly (PowerShell as Administrator):
   ```powershell
   cd path\to\defendu-mobile
   .\allow-port-firewall.ps1
   ```
   If scripts are disabled: `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process` in that PowerShell, then run the script again.

To remove the rule later: Windows Security → Firewall → Advanced settings → Inbound Rules → delete “Defendu Mobile Test - Port 8082”.

### Same Wi‑Fi and client isolation

Phone and PC must be on the **same Wi‑Fi** (same subnet) for LAN mode. Some routers have **client/AP isolation** (devices on Wi‑Fi can’t talk to each other); turn it off for testing or use tunnel mode.

## Tunnel options (phone can’t reach PC on LAN)

If the browser or app on the phone shows “Site cannot be reached” or “Network request failed”, use a tunnel so the phone connects over the internet.

### Option A: Expo tunnel (for the app itself)

When you run `npm start`, answer **y** to “Run as tunnel?”. Expo will use its tunnel; scan the new QR code in Expo Go. No extra setup.

### Option B: localtunnel (for the test server on port 8082)

1. **Terminal 1:** `node api/test-server.js` (leave running).  
2. **Terminal 2:** `npm run tunnel` (or `npx localtunnel --port 8082`).  
3. Use the **https://** URL printed by localtunnel as the Server URL in your app (when you add that feature).

### Option C: localhost.run (if you have OpenSSH)

With `node api/test-server.js` running:

```bash
ssh -R 80:localhost:8082 nokey@localhost.run
```

Use the **https://** URL it prints as the Server URL. No signup (OpenSSH is built into Windows 10/11).
