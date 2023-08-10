<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div id="global-content-container">
            <slot>
                <router-view></router-view>
            </slot>
        </div>
    </div>
</template>
