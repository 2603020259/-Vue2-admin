<template>
    <div>
        <el-tag v-for="(item, index) in tags" :key="item.label" :closable="item.name !== 'home'" @click="changeMune(item)"
            @close="handlesClose(item, index)" :effect="$route.name === item.name ? 'dark' : 'plain'" class="tag">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'Tag',
    data() {
        return {
          
        }
    },
    computed: {
        ...mapState('headerAbout', { tags: 'routerList' }),
        ...mapState('asideAbout', { menu: 'menu' }),
    },
    methods: {
        ...mapMutations('headerAbout', ['CHANGEMUNE']),
        changeMune(item) {
            //console.log('aaa',item);
            this.$router.push({
                name: item.name,
            });
        },
        handlesClose(item, index) {
            this.CHANGEMUNE(item);
            const lenght = this.tags.length;
            if (item.name !== this.$route.name) {
                return
            }
            if (index === lenght) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    },
    watch:{
        menu(value){
            console.log(1111,value);
        }
       
    }

}
</script>

<style>
.tag{
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin: 20px 10px 0px 10px;
    cursor: pointer;
}
</style>