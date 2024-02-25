import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formFill=document.querySelector(".form");



formFill.addEventListener('submit', event => {
  event.preventDefault();
  const timer = event.currentTarget.elements.delay.value;
  const radio = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {

      console.log(timer, radio );
      if (radio ==="fulfilled") {
        resolve(
          iziToast.show({  
            color: 'green',
            position: "topRight",
            message: `✅ Fulfilled promise in ${timer}ms`
        })
          );
      } else {
        reject(
          iziToast.show({ 
            color: 'red',
            position: "topRight",          
            message: `❌ Rejected promise in ${timer}ms`
        })
        );
      }
    }, timer);
  });

});


    
  