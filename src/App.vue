
 <template>
  <div id="app">
    <template-header></template-header>
    <main>
        <router-view></router-view>
    </main>
    <router-view name="modal"></router-view>
  </div>
</template>

<script>
import templateHeader from './components/Header'
    
    export default {
        name: 'app',

        components: {
            templateHeader
        }
    }

</script>

<style lang="scss">
    @import './assets/scss/main.scss';
</style>