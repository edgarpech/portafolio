# Portafolio — Vue 3 + Vite

Este proyecto usa **pnpm** como gestor de paquetes (npm y yarn están bloqueados por el script `preinstall` con `only-allow pnpm`).

## Requisitos
- Node.js >= 18
- pnpm >= 9

Instalar pnpm (una sola vez):

```bash
# Opción recomendada (Corepack viene con Node)
corepack enable
corepack prepare pnpm@9.12.3 --activate

# O alternativamente
npm i -g pnpm
```

## Comandos

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm preview      # previsualizar build
```

