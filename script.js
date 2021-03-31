let Validator = {
    handleSubmit : (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        Validator.clearErrors();

        for(let i= 0; i < inputs.length; i++) {
            let input = inputs[i];
            
            let check = Validator.checkInput(input);
            if(check !== true) {
                send = false;
                
                Validator.showError(input,check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput : (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let details = rules[k].split('=');
                switch(details[0]){
                    case 'required':
                        if(input.value ==''){
                            return 'Campo Obrigatorio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < details[1]){
                            return 'Campo tem que ter '+details[1]+' caracteres ou mais'
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail invalido'
                            }
                    break;
                        }
                }
            }
        }
        return true;

    },
    showError:(input,error) => {
        input.style.border = '1px solid #FF0000';

       let errorElement = document.createElement('div');
       errorElement.classList.add('error');
       errorElement.innerHTML = error;

       input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let input = form.querySelectorAll('input');
        for(let k = 0;k < input.length;k++){
            input[k].style = '';
        }

        let errorElement = document.querySelectorAll('.error');
        for(let i = 0; i < errorElement.length; i++) {
            errorElement[i].remove();
        }
    }
}

let form = document.querySelector('.validator');
form.addEventListener('submit',Validator.handleSubmit);