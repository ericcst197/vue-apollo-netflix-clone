<script setup lang="ts">

</script>

<template>
    <div id="global-content-container">
        <div class="flex flex-col min-h-screen">
            <slot>
                <router-view></router-view>
            </slot>
        </div>
    </div>
</template>
