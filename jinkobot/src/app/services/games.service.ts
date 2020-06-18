
/*********************************************************************
@name games.service.ts
@description Servicio con los juegos y ejercicios
@author Diana Hernández Soler
@date 22/05/2020
@license GPLv3
*********************************************************************/
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private operators = ['+', '-', '*'];
    private operation = {id: 0, type: 'math', src: '', question: '2 + 2', answer: '4'};
    private exercises = [
        {   id: 1,
            type: 'emotions',
            src: '../../assets/img/exercises/1.png',
            question: 'El tren no funciona, está roto ¿Cómo está el niño?',
            answer: 'triste'
        },
        {
            id: 2,
            type: 'emotions',
            src: '../../assets/img/exercises/2.png',
            question: 'El niño juega con la bici ¿Cómo está el niño?',
            answer: 'feliz'
        },
        {
            id: 3,
            type: 'inferences',
            src: '../../assets/img/exercises/3.jpeg',
            question: 'El niño no se ha comido el bacadillo en el recreo ¿El niño está en el colegio o en su casa?',
            answer: 'cole'
        },
        {
            id: 4,
            type: 'inferences',
            src: '../../assets/img/exercises/4.jpg',
            question: 'Juan lleva todo el día conduciendo y ha parado a echar gasolina ¿Juán va en coche o en bicicleta?',
            answer: 'coche'
        },
        {
            id: 5,
            type: 'emotions',
            src: '../../assets/img/exercises/5.png',
            question: 'El niño quiere subir al tobogán y la niña no le deja. ¿Cómo está el niño?',
            answer: 'enfado'
        },
        {
            id: 6,
            type: 'inferences',
            src: '../../assets/img/exercises/6.jpg',
            question: 'Compramos palomitas y nos pusimos cómodos a ver la película. ¿Dónde estamos?',
            answer: 'cine'
        },
        {
            id: 7,
            type: 'inferences',
            src: '../../assets/img/exercises/7.jpg',
            // tslint:disable-next-line: max-line-length
            question: 'Carlos se tiro desde el trampolín y sus amigos lo miraron desde la zona de comidas.¿Carlos está en la piscina o en el teatro?',
            answer: 'piscina'
        },
    ];

    constructor() {}

    /***************************************************************************************
    getMathEx()
    @author Diana Hernández
    @description Función para crear una operación matemática aleatoria
    @date 23/04/2020
    ****************************************************************************************/
    public getMathEx() {
        const op = this.operators[this.getRandomInt(0, (this.operators.length - 1))];
        let x = this.getRandomInt(1, 4);
        let y = this.getRandomInt(1, 5);
        let answer, question;
        switch (op) {
            case '+':
                answer = x + y;
                question = x + ' + ' + y;
                break;
            case '-':
                if (x < y) {
                    const aux = x;
                    x = y;
                    y = aux;
                }
                answer = x - y;
                question = x + ' - ' + y;
                break;
            case '*':
                answer = x * y;
                question = x + ' x ' + y;
        }
        this.operation.question = question;
        this.operation.answer = answer;
        console.log('Operación aleatoria', this.operation.question + ' = ' + this.operation.answer);
        return this.operation;
    }

    /***************************************************************************************
    getExercise()
    @author Diana Hernández
    @description Función que devuelve un ejercico aleatorio
    @params type: tipo de ejercicio ['inferences', 'emotions']
    @date 23/04/2020
    ****************************************************************************************/
    public getExercise(type: string) {
           let array =  this.exercises;
           let max = array.length;

           // Si se especifica el tipo se filtra por él
           if (type !== 'random') {

            array = this.exercises.filter(ex => ex.type === type);
            max = array.length;
    }


           const randomIndex = this.getRandomInt(0, max);
           // console.log('Ejercicio aleatorio', array[randomIndex]);
           return array[randomIndex];

    }

    // Retorna un entero aleatorio entre min (incluido) y max (excluido)
    // ¡Usando Math.round() te dará una distribución no-uniforme!
    private getRandomInt(min, max): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}
