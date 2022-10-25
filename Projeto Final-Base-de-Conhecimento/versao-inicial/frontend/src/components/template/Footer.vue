<template>
    <footer class="footer">
        <span>Copyright <strong>Douglas Rodrigues</strong> © 2022</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: black;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>