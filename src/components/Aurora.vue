<template>
    <div class="aurora" aria-hidden="true">
        <div class="aurora-blob aurora-blob-1"></div>
        <div class="aurora-blob aurora-blob-2"></div>
        <div class="aurora-blob aurora-blob-3"></div>
        <div class="aurora-grid"></div>
        <div class="aurora-noise"></div>
    </div>
</template>

<style scoped>
    .aurora {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        background:
            radial-gradient(ellipse at top, rgba(163, 230, 53, 0.04), transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(232, 121, 249, 0.04), transparent 60%),
            #0a0a0f;
    }

    .aurora-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.35;
        will-change: transform;
    }

    .aurora-blob-1 {
        top: -10%;
        left: -10%;
        width: 50vw;
        height: 50vw;
        max-width: 600px;
        max-height: 600px;
        background: radial-gradient(circle, rgba(163, 230, 53, 0.5), transparent 70%);
        animation: drift-1 22s ease-in-out infinite;
    }

    .aurora-blob-2 {
        bottom: -15%;
        right: -10%;
        width: 55vw;
        height: 55vw;
        max-width: 700px;
        max-height: 700px;
        background: radial-gradient(circle, rgba(232, 121, 249, 0.45), transparent 70%);
        animation: drift-2 26s ease-in-out infinite;
    }

    .aurora-blob-3 {
        top: 40%;
        left: 50%;
        width: 35vw;
        height: 35vw;
        max-width: 500px;
        max-height: 500px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
        animation: drift-3 30s ease-in-out infinite;
    }

    .aurora-grid {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    }

    .aurora-noise {
        position: absolute;
        inset: 0;
        opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    @keyframes drift-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(15vw, 10vh) scale(1.1); }
    }

    @keyframes drift-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-15vw, -10vh) scale(1.15); }
    }

    @keyframes drift-3 {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-30%, -70%) scale(1.2); }
    }

    @media (prefers-reduced-motion: reduce) {
        .aurora-blob {
            animation: none;
        }
    }
</style>
