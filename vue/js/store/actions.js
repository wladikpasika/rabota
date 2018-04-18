import Vue from 'vue';
export default {

    GET_MAIN_SLIDERS(context) {

        context.commit('SET_MAIN_SLIDERS_DOWNLOAD', true);

        let get;

        if(window.location.port==='8082'||window.location.port===''){
            get = '?slider=main_slider';
        }
        else {
            get = '/assets/db/firstslider.json';
        }
        Vue.http.get(get).then((response) => {
            console.log('запрос');
            context.commit('SET_MAIN_SLIDERS', response.data)
        }).then(()=>{context.commit('SET_MAIN_SLIDERS_DOWNLOAD', false)});
    },

    GET_NAV_MENU(context) {

        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=nav';

        }
        else {
            get = '/assets/db/nav-menu.json';
        }
        Vue.http.get(get).then((response) => {
            context.commit('SET_NAV_MENU', response.data)
        });
    },
    GET_REVIEWS(context) {

        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=reviews';

        }
        else {
            get = '/assets/db/reviews.json';
        }
        Vue.http.get(get).then((response) => {
            console.log(response);
            context.commit('SET_REVIEWS', response.data)
        });
    },
    GET_ABOUT(context){
        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=about';

        }
        else {
            get = '/assets/db/about.json';
        }
        Vue.http.get(get).then((response) => {
            console.log(response);
            context.commit('SET_ABOUT', response.data)
        });

    },
    GET_CLIENTS_PHOTOS(context) {

        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=clients_block';

        }
        else {
            get = '/assets/db/clients_block.json';
        }
        Vue.http.get(get).then((response) => {
            context.commit('SET_CLIENTS_PHOTOS', response.data)
        });
    },

    GET_SERVICES_SLIDERS(context) {

        context.commit('SET_SERVICES_SLIDERS_DOWNLOAD',true);

        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=block_services';
        }
        else {
            get = '/assets/db/services-slider.json';
        }

        return Vue.http.get(get).then((response) => {
            return context.commit('SET_SERVICES_SLIDERS', response.data)
        }).then(()=>{
            return context.commit('SET_SERVICES_SLIDERS_DOWNLOAD',false)
        });
    },

    /*получаем ширину экрана*/
    GET_SCREEN_WIDTH(context){
        /*передаем ширину в мутацию, потом в хранилище*/
        let body = document.body;
        let documentElement = document.documentElement;
        let widthScreen = Math.max(
            /*body.scrollWidth, documentElement.scrollWidth,*/
            body.offsetWidth, documentElement.offsetWidth,
            body.clientWidth, documentElement.clientWidth);
        context.commit('SET_SCREEN_WIDTH', widthScreen);
    },
    /*получаем высоту экрана*/
    GET_SCREEN_HEIGHT(context){
        /*передаем высоту в мутацию, потом в хранилище*/

        let heightScreen = document.documentElement.clientHeight;
        let availHeightScreen = screen.width>980?heightScreen:screen.availHeight;
        context.commit('SET_SCREEN_HEIGHT', heightScreen);
        context.commit('SET_SCREEN_AVAIL_HEIGHT', availHeightScreen)
    },
    OVERLAY_GET(context){

        let overlayDisplay;

        if(context.state.overlayDisplay){
            overlayDisplay=false;
        }
        else{
            overlayDisplay=true;
        }
        return context.commit('OVERLAY_SET', overlayDisplay);
    },
    GET_CONTACTS(context){

        let get;

        if(window.location.port==='8082'||window.location.port===''){

            get = '?slider=contacts';

        }
        else {
            get = '/assets/db/contacts.json';
        }
        Vue.http.get(get).then((response) => {
            context.commit('SET_CONTACTS', response.data)
        });
    }
}