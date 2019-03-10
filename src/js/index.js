'use strict'

const slider = document.querySelector('.slider');

var pelkSlider = function(selector,options){

    const optsDefault = {
        itemsClass:'.slider-item',
        arrowClass:'.dot',
        itemsVisible:3,//Only odd number
        timeoutSeconds:5,
        currentSlide:0,
        arrowLeftClass:'.dot__left',
        arrowRightClass:'.dot__right'
    };

    function getOption(optsName){

        if (options !== undefined) {
            if (options[optsName] === undefined) {
                return optsDefault[optsName];
            } else {
                return options[optsName];
            }
        }
        return optsDefault[optsName];
    }

    function setOption(optName,value){
        optsDefault[optName] = value;
    }

    function getVisibleItems(){
        let itemsVisible = getOption('itemsVisible')
        let currentSlide = getOption('currentSlide')
        let arrVisible = [];

        let current = currentSlide;
        let minus = Math.floor(itemsVisible/2)

        for(let i = 0; i < Math.floor(itemsVisible/2); i++){
            if(sliderItems[current - minus] !== undefined){
                console.log('minus');
                arrVisible.push(sliderItems[current - minus]);

            }else{
                arrVisible.push(sliderItems[sliderItems.length - minus]);

            }
            minus++
        }

        arrVisible.push(sliderItems[current]);


        let plusDo = Math.floor(itemsVisible/2)
        let plus = 0

        for(let i = 0; i < Math.floor(itemsVisible/2); i++){
            if(sliderItems[current + plusDo] !== undefined){
                arrVisible.push(sliderItems[current + plusDo]);

            }else{
                arrVisible.push(sliderItems[plus]);
            }
            plusDo--
            plus++
        }
        return arrVisible;
    }

    let sliderItems = selector.querySelectorAll(getOption('itemsClass'))

    function setItems(event = 'left'){

        for(let i = 0; i < sliderItems.length; i++){
            if(sliderItems[i].classList.contains('slide__center')){
                sliderItems[i].classList.remove('slide__center')
            }
            if(event === 'left'){
                if(sliderItems[i].classList.contains('slide__left-side')){
                    sliderItems[i].classList.remove('slide__left-side')
                }
                if(sliderItems[i].classList.contains('slide__right-side')){
                    sliderItems[i].classList.remove('slide__visible')
                    sliderItems[i].classList.remove('slide__right-side')
                }
            }
            if(event === 'right'){
                console.log('right');
                if(sliderItems[i].classList.contains('slide__right-side')){
                    sliderItems[i].classList.remove('slide__right-side')
                }
                if(sliderItems[i].classList.contains('slide__left-side')){
                    sliderItems[i].classList.remove('slide__visible')
                    sliderItems[i].classList.remove('slide__left-side')
                }
            }
           // sliderItems[i].classList.remove('slide__left-side')

        }

        let visibleItems = getVisibleItems();
        let countsForSide = Math.floor(visibleItems.length / 2);

        let before = countsForSide;
        let after = countsForSide;

        let count = 0;
        for(let i = 0; i < before; i++){
            if(!visibleItems[count].classList.contains('slide__visible')){
                visibleItems[count].classList.add('slide__visible');
            }
            if(!visibleItems[count].classList.contains('slide__left-side')){
                visibleItems[count].classList.add('slide__left-side');
            }
            count++
        }

        visibleItems[count].classList.add('slide__visible');
        visibleItems[count].classList.add('slide__center');
        count++

        for(let i = 0; i < after; i++){
            if(!visibleItems[count].classList.contains('slide__visible')){
                visibleItems[count].classList.add('slide__visible');
            }
            if(!visibleItems[count].classList.contains('slide__right-side')){
                visibleItems[count].classList.add('slide__right-side');
            }
            count++
        }

    }

    setItems()

    selector.querySelector(getOption('arrowLeftClass')).onclick = function(){
        console.log('left event')
        setOption('currentSlide',(getOption('currentSlide') != 0) ? getOption('currentSlide')  - 1 : sliderItems.length - 1);
        setItems('left')
    }

    selector.querySelector(getOption('arrowRightClass')).onclick = function(){
        console.log('right event')
        setOption('currentSlide',(getOption('currentSlide') != sliderItems.length - 1) ? getOption('currentSlide') + 1 : 0);
        setItems('right')
    }




}(slider)