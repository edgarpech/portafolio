<template>
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled, 'fab-open': isOpen }">
        <!-- Desktop pill (hidden on mobile via CSS) -->
        <div class="navbar-inner">
            <router-link v-for="link in links" :key="link.path" :to="link.path" class="nav-link"
                :class="{ 'nav-active': isActive(link.path) }">
                <span class="nav-icon-wrap">
                    <component :is="link.icon" class="nav-icon" :size="20" :stroke-width="1.75" />
                </span>
                <span class="nav-label">{{ link.name }}</span>
            </router-link>
        </div>

        <!-- Mobile FAB cluster (hidden on desktop via CSS) -->
        <div class="fab-cluster"
            ref="fabClusterRef"
            :class="[
                'fab-corner-' + corner,
                { 'is-open': isOpen, 'is-dragging': isDragging, 'is-hint': showHint }
            ]"
            v-click-outside="closeMenu">

            <!-- Trigger (first in DOM so it anchors top for top-corners, bottom for bottom-corners) -->
            <button type="button" class="fab-trigger"
                :aria-expanded="isOpen"
                aria-haspopup="menu"
                :aria-label="isOpen ? 'Cerrar menu' : `Abrir menu — estas en ${activeLink.name}`"
                @click="onTriggerClick"
                @pointerdown="onPointerDown"
                @contextmenu.prevent>
                <!-- Long-press hint bubble (inside trigger so it's always positioned relative to the 48px button) -->
                <span class="fab-hint" role="status" aria-live="polite">
                    Arrástrame a una esquina
                </span>
                <span class="fab-icon" v-show="!isOpen">
                    <component :is="activeLink.icon" :size="20" :stroke-width="2" />
                </span>
                <span class="fab-icon fab-icon-x" v-show="isOpen" aria-hidden="true">
                    <X :size="20" :stroke-width="2.25" />
                </span>
                <span class="fab-pulse" aria-hidden="true"></span>
            </button>

            <!-- Stack of inactive destinations (below trigger for top-corners, above for bottom-corners) -->
            <ul class="fab-stack" role="menu" :aria-hidden="!isOpen">
                <li v-for="(link, i) in inactiveLinks" :key="link.path"
                    class="fab-item"
                    :style="{ '--i': i, '--total': inactiveLinks.length }"
                    role="none">
                    <router-link :to="link.path" class="fab-action" role="menuitem"
                        :tabindex="isOpen ? 0 : -1"
                        @click="closeMenu">
                        <span class="fab-action-label">{{ link.name }}</span>
                        <span class="fab-action-icon">
                            <component :is="link.icon" :size="18" :stroke-width="1.75" />
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { House, UserRound, FolderKanban, Mail, X } from 'lucide-vue-next';

    const route = useRoute();
    const isScrolled = ref(false);
    const isOpen = ref(false);

    const links = [
        { path: '/', name: 'Inicio', icon: House },
        { path: '/sobre-mi', name: 'Sobre mí', icon: UserRound },
        { path: '/proyectos', name: 'Proyectos', icon: FolderKanban },
        { path: '/contacto', name: 'Contacto', icon: Mail }
    ];

    const isActive = (path) => {
        return (route.path.startsWith(path) && path !== '/') || route.path === path;
    };

    const activeLink = computed(() => links.find(l => isActive(l.path)) || links[0]);
    const inactiveLinks = computed(() => links.filter(l => l.path !== activeLink.value.path));

    const toggleMenu = () => { isOpen.value = !isOpen.value; };
    const closeMenu = () => { isOpen.value = false; };

    /* ---------- FAB corner snap + long-press drag ---------- */
    const STORAGE_KEY = 'fab-corner';
    const VALID = ['tl', 'tr', 'bl', 'br'];
    const corner = ref('tr'); // default: top-right

    const fabClusterRef = ref(null);
    const isDragging = ref(false);
    const showHint = ref(false);
    let pressTimer = null;
    let hintTimer = null;
    let startX = 0, startY = 0;
    let didDrag = false;

    const clearHint = () => {
        if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
        showHint.value = false;
    };

    const loadCorner = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && VALID.includes(saved)) corner.value = saved;
        } catch { /* ignore */ }
    };

    const saveCorner = (c) => {
        try { localStorage.setItem(STORAGE_KEY, c); } catch { /* ignore */ }
    };

    const onTriggerClick = (e) => {
        if (didDrag) {
            didDrag = false;
            e.preventDefault();
            return;
        }
        toggleMenu();
    };

    const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        startX = e.clientX;
        startY = e.clientY;
        didDrag = false;
        pressTimer = setTimeout(() => {
            enterDragMode();
        }, 450);
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp, { once: true });
        window.addEventListener('pointercancel', onPointerUp, { once: true });
    };

    const enterDragMode = () => {
        isDragging.value = true;
        showHint.value = true;
        if (isOpen.value) closeMenu();
        if (navigator.vibrate) navigator.vibrate(15);
        // Auto-hide hint after 2.5s
        if (hintTimer) clearTimeout(hintTimer);
        hintTimer = setTimeout(() => { showHint.value = false; }, 2500);
        // Prepare element for smooth dragging
        const el = fabClusterRef.value;
        if (el) el.style.willChange = 'transform';
    };

    const onPointerMove = (e) => {
        if (!isDragging.value) {
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);
            if (dx > 8 || dy > 8) cancelPress();
            return;
        }
        e.preventDefault();
        // Hide hint as soon as user starts moving
        if (showHint.value) clearHint();
        didDrag = true;
        // Follow the finger in real-time
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const el = fabClusterRef.value;
        if (el) el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const cancelPress = () => {
        if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
        window.removeEventListener('pointermove', onPointerMove);
    };

    const onPointerUp = (e) => {
        if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
        window.removeEventListener('pointermove', onPointerMove);

        if (isDragging.value) {
            const el = fabClusterRef.value;

            // 1. Instantly clear the drag transform (suppress transition momentarily)
            if (el) {
                el.style.transition = 'none';
                el.style.transform = '';
                el.style.willChange = '';
                el.getBoundingClientRect(); // force reflow so transition:none takes effect
                el.style.transition = ''; // restore CSS transitions
            }

            // 2. Calculate snap corner from release position
            const x = e.clientX ?? startX;
            const y = e.clientY ?? startY;
            const horiz = x < window.innerWidth / 2 ? 'l' : 'r';
            const vert = y < window.innerHeight / 2 ? 't' : 'b';
            const next = vert + horiz;

            // 3. Set corner — CSS spring transition animates the snap to new position
            corner.value = next;
            saveCorner(next);
            isDragging.value = false;
            showHint.value = false;
            if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
            didDrag = true;
        }
    };

    const handleScroll = () => {
        isScrolled.value = window.scrollY > 20;
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape' && isOpen.value) closeMenu();
    };

    const vClickOutside = {
        mounted(el, binding) {
            el.__clickOutside = (event) => {
                if (!el.contains(event.target)) binding.value(event);
            };
            document.addEventListener('click', el.__clickOutside, true);
        },
        unmounted(el) {
            document.removeEventListener('click', el.__clickOutside, true);
        }
    };

    onMounted(() => {
        loadCorner();
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('keydown', handleEsc);
        handleScroll();
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('keydown', handleEsc);
        window.removeEventListener('pointermove', onPointerMove);
        if (hintTimer) clearTimeout(hintTimer);
    });
</script>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        display: flex;
        justify-content: center;
        padding: 1rem;
        transition: all 0.3s ease;
    }

    .navbar-inner {
        display: flex;
        gap: 0.25rem;
        padding: 0.4rem;
        border-radius: 999px;
        background: rgba(19, 19, 26, 0.7);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .navbar-scrolled .navbar-inner {
        background: rgba(10, 10, 15, 0.85);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }

    .nav-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 1.1rem;
        border-radius: 999px;
        color: #a1a1aa;
        text-decoration: none;
        transition: color 0.25s ease, background 0.25s ease;
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }

    .nav-link:hover {
        color: #f5f5f7;
    }

    .nav-active {
        color: #0a0a0f;
        background: #a3e635;
    }

    .nav-active:hover {
        color: #0a0a0f;
    }

    .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .nav-label {
        font-size: 0.875rem;
        font-weight: 500;
    }

    .seg-indicator,
    .fab-cluster {
        display: none;
    }

    /* Hide the icon wrap as a layout box on desktop (becomes a real flex item on mobile) */
    .nav-icon-wrap {
        display: contents;
    }

    /* ============================================
       Mobile: FAB (Floating Action Button) cluster
       Default position top-right, draggable to any of 4 corners.
    ============================================ */
    @media (max-width: 639px) {
        /* The whole nav becomes a non-blocking layer; only the FAB itself catches taps */
        .navbar {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0;
            pointer-events: none;
            background: transparent !important;
        }

        .navbar-inner {
            display: none;
        }

        .fab-cluster {
            --fab-edge: max(0.85rem, env(safe-area-inset-right));
            --fab-edge-y: max(0.85rem, env(safe-area-inset-top));
            --fab-edge-y-bottom: calc(max(0.85rem, env(safe-area-inset-bottom)) + 3.25rem);

            position: fixed;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            pointer-events: auto;
            z-index: 60;
            transition: top 0.4s cubic-bezier(0.34, 1.4, 0.5, 1),
                        bottom 0.4s cubic-bezier(0.34, 1.4, 0.5, 1),
                        left 0.4s cubic-bezier(0.34, 1.4, 0.5, 1),
                        right 0.4s cubic-bezier(0.34, 1.4, 0.5, 1);
        }

        /* Disable position transitions while drag is in progress */
        .fab-cluster.is-dragging {
            transition: none !important;
        }

        /* Corner positions */
        .fab-corner-tr {
            top: var(--fab-edge-y);
            right: var(--fab-edge);
            bottom: auto;
            left: auto;
            align-items: flex-end;
            flex-direction: column; /* stack grows downward from trigger */
        }
        .fab-corner-tl {
            top: var(--fab-edge-y);
            left: var(--fab-edge);
            bottom: auto;
            right: auto;
            align-items: flex-start;
            flex-direction: column;
        }
        .fab-corner-br {
            bottom: var(--fab-edge-y-bottom);
            right: var(--fab-edge);
            top: auto;
            left: auto;
            align-items: flex-end;
            flex-direction: column-reverse; /* stack grows upward */
        }
        .fab-corner-bl {
            bottom: var(--fab-edge-y-bottom);
            left: var(--fab-edge);
            top: auto;
            right: auto;
            align-items: flex-start;
            flex-direction: column-reverse;
        }

        /* Optional dimming backdrop when open */
        .fab-cluster::before {
            content: '';
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: -1;
        }

        .fab-cluster.is-open::before {
            opacity: 1;
        }

        /* Long-press drag hint bubble */
        .fab-hint {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.25rem 0.5rem;
            border-radius: 999px;
            background: rgba(20, 20, 22, 0.95);
            border: 1px solid rgba(163, 230, 53, 0.4);
            color: var(--text-primary);
            font-family: var(--font-mono);
            font-size: 0.62rem;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
            z-index: 2;
        }
        /* Place the hint flush right against the trigger */
        .fab-corner-tr .fab-hint,
        .fab-corner-br .fab-hint {
            right: calc(100% + 0.1rem);
        }
        .fab-corner-tl .fab-hint,
        .fab-corner-bl .fab-hint {
            left: calc(100% + 0.1rem);
        }
        .fab-cluster.is-hint .fab-hint {
            opacity: 1;
        }

        /* Stack of inactive destinations */
        .fab-stack {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: inherit;
            align-items: inherit;
            gap: 0.45rem;
        }

        .fab-item {
            opacity: 0;
            /* Top corners: trigger is above, items appear below → start above final pos, drop down */
            transform: translateY(-10px) scale(0.85);
            pointer-events: none;
            transition: opacity 0.25s ease,
                        transform 0.35s cubic-bezier(0.34, 1.4, 0.5, 1);
            transition-delay: calc(var(--i) * 55ms);
        }

        /* Bottom corners: trigger is below, items appear above → start below final pos, rise up */
        .fab-corner-br .fab-item,
        .fab-corner-bl .fab-item {
            transform: translateY(10px) scale(0.85);
        }

        .fab-cluster.is-open .fab-item {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
            transition-delay: calc(var(--i) * 60ms);
        }

        .fab-action {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.3rem 0.45rem 0.3rem 0.85rem;
            border-radius: 999px;
            background: rgba(20, 20, 22, 0.92);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-primary);
            text-decoration: none;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(16px) saturate(160%);
            -webkit-backdrop-filter: blur(16px) saturate(160%);
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        /* Left-anchored corners: icon first, then label */
        .fab-corner-tl .fab-action,
        .fab-corner-bl .fab-action {
            flex-direction: row-reverse;
            padding: 0.3rem 0.85rem 0.3rem 0.45rem;
        }

        .fab-action:active {
            transform: scale(0.96);
        }

        .fab-action:hover {
            border-color: rgba(163, 230, 53, 0.35);
        }

        .fab-action-label {
            font-family: var(--font-mono);
            font-size: 0.74rem;
            font-weight: 500;
            letter-spacing: 0.01em;
            white-space: nowrap;
        }

        .fab-action-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-secondary);
        }

        /* Trigger button — smaller (48px), perfectly centered icon */
        .fab-trigger {
            position: relative;
            overflow: visible;
            width: 48px;
            height: 48px;
            padding: 0;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            background: var(--neon-lime);
            color: #0a0a0a;
            display: grid;
            place-items: center;
            box-shadow: 0 10px 24px rgba(163, 230, 53, 0.32),
                        0 3px 8px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1),
                        box-shadow 0.3s ease,
                        background 0.3s ease;
            -webkit-tap-highlight-color: transparent;
            touch-action: none; /* prevent scroll while long-pressing */
        }

        .fab-trigger:active {
            transform: scale(0.94);
        }

        .fab-cluster.is-open .fab-trigger {
            background: var(--text-primary);
            color: #0a0a0a;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.55);
        }

        .fab-cluster.is-dragging .fab-trigger {
            transform: scale(1.12);
            box-shadow: 0 16px 32px rgba(163, 230, 53, 0.5),
                        0 0 0 6px rgba(163, 230, 53, 0.18);
            cursor: grabbing;
        }

        .fab-icon {
            grid-area: 1 / 1;
            display: grid;
            place-items: center;
            line-height: 0;
            transition: opacity 0.2s ease;
        }

        .fab-icon-x {
            color: #0a0a0a;
        }

        /* Discoverability pulse */
        .fab-pulse {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.45);
            animation: fabPulse 2.6s ease-out infinite;
            pointer-events: none;
        }

        .fab-cluster.is-open .fab-pulse,
        .fab-cluster.is-dragging .fab-pulse {
            animation: none;
            opacity: 0;
        }

        @keyframes fabPulse {
            0% { box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(163, 230, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(163, 230, 53, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
            .fab-trigger,
            .fab-icon,
            .fab-item,
            .fab-pulse {
                transition: none !important;
                animation: none !important;
            }
        }
    }
</style>
