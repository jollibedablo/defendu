# MVC structure

- **models/** – Types, interfaces, and data shapes (e.g. `navigation.types.ts`, `auth.types.ts`).
- **views/** – UI only: **screens/** and **components/** (TSX). No business logic.
- **controllers/** – Business logic and state: auth, toast, API calls. Views call controllers.

Use `.ts` for types/utils and `.tsx` for React components. The **api/** folder at project root may use `.js` for server/API scripts.
