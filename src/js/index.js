'use strict'

const slider = document.querySelector('.slider');

var pelkSlider = function(selector,options){

    const optsDefault = {
        itemsClass:'.slider-item',
        arrowClass:'.dot',
        itemsVisible:3,//Only odd number
        timeoutSeconds:5,
        currentSlide:3,
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

        let order = 1;
        for(let i = 0; i < Math.floor(itemsVisible/2); i++){
            if(sliderItems[current - minus] !== undefined){
                console.log('minus');
                arrVisible.push(sliderItems[current - minus]);
                sliderItems[current - minus].style.order =  order
                order++
            }else{
                arrVisible.push(sliderItems[sliderItems.length - minus]);
                sliderItems[sliderItems.length - minus].style.order =  order
                order++
            }
            minus++
        }

        arrVisible.push(sliderItems[current]);
        sliderItems[current].style.order = order
        order++

        let plusDo = Math.floor(itemsVisible/2)
        let plus = 0

        for(let i = 0; i < Math.floor(itemsVisible/2); i++){
            if(sliderItems[current + plusDo] !== undefined){
                arrVisible.push(sliderItems[current + plusDo]);
                sliderItems[current + plusDo].style.order = order
                order++
            }else{
                arrVisible.push(sliderItems[plus]);
                sliderItems[plus].style.order = order
                order++
            }
            plusDo--
            plus++
        }
        return arrVisible;
    }

    function setVisibleSliderItems(){
        let visibleItems = getVisibleItems();
        let currentSlide = getOption('currentSlide')


        for(let i = 0; i < sliderItems.length; i++){
            if(visibleItems.indexOf(sliderItems[i]) > -1){
                console.log(sliderItems[i])
                sliderItems[i].classList.remove('slide__center')
                sliderItems[i].classList.remove('slide__hide')
                sliderItems[i].classList.add('slide__side')
                sliderItems[i].style.display = 'flex';

            }else{
                sliderItems[i].classList.add('slide__hide')
                sliderItems[i].style.display = 'none';
            }
        }
        sliderItems[currentSlide].classList.add('slide__center')
    }

    let sliderItems = selector.querySelectorAll(getOption('itemsClass'));
    setVisibleSliderItems()

    let arrowLeft = selector.querySelector(getOption('arrowLeftClass'))
    let arrowRight = selector.querySelector(getOption('arrowRightClass'))


    arrowLeft.onclick = function(){
        console.log('left')
        let leftCurrent = (getOption('currentSlide') !== 0) ? getOption('currentSlide')-1 : sliderItems.length - 1
        setOption('currentSlide',leftCurrent);
        setVisibleSliderItems()
    }

    arrowRight.onclick = function(){
        console.log('right')
        let leftCurrent = (getOption('currentSlide') !== sliderItems.length - 1) ? getOption('currentSlide')+1 : 0
        setOption('currentSlide',leftCurrent);
        setVisibleSliderItems()
    }



}(slider)