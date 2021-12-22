import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor minimo', () => {
    //Testando o cenario de valor invalido, onde o evento não deve ser emitido para valores invalidos, menores que zero
    test('Não aceita lance com valor menor do que zero', () => { //O primeiro parametro é a descrição do que iremos testar, o segundo parametro é a função que irá conter o teste
        const wrapper = mount(Lance) //Montando o componente Lance

        const input = wrapper.find('input') //Capturando o input dentro do componente Lance
        input.setValue(-100) //Defininfo um valor invalido para o input

        const lancesEmitidos = wrapper.emitted('novo-lance') //Ouvindo todos as emissões de evento, do evento 'novo-lance'
        wrapper.trigger('submit') //Usando o trigger para ativar o evento de submit do formulario

        expect(lancesEmitidos).toBeUndefined() //Esperando que lancesEmitidos retornem undefined
    })

    //Testando o cenario de sucesso, onde o evento deve ser chamado, pois existe um valor maior do que zero
    test('Emite um lance quando o valor é maior do que zero', () => {
        const wrapper = mount(Lance)

        const input = wrapper.find('input')
        input.setValue(100) //Defininfo um valor valido para o input

        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')

        expect(lancesEmitidos).toHaveLength(1) //Esperando que lancesEmitidos retornem um tamanho 1, que exista elementos dentro dele
    })

    //Garantindo que o valor emito do lance, seja o mesmo inserindo em nosso componente
    test('Emite o valor esperado de um lance válido', () => {
        const wrapper = mount(Lance)

        const input = wrapper.find('input')
        input.setValue(100)

        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')

        // Resultado emitido pelo lancesEmitidos
        // [
        //     [100]
        // ]

        const lance = parseInt(lancesEmitidos[0][0]) //Pegando o resultado de lancesEmitidos para conferir se é o mesmo inserido no componente
        expect(lance).toBe(100) //Esperando que o valor de lance seja 100, o mesmo que foi inserido no input
    })
})

describe('Um lance com valor minimo', () => {
    //Delimitando um valor minimo para o lance
    test('Todos os lances devem possuir um valor maior do que o minimo informado', () => {
        const wrapper = mount(Lance, { //Enviando como parametro um objeto JS com valores de propriedades
            propsData: { //Enviando propriedades para nosso componente Lance
                lanceMinimo: 300
            }
        })

        const input = wrapper.find('input')
        input.setValue(400) //Atribuindo um valor valido

        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')

        expect(lancesEmitidos).toHaveLength(1) //Esperamos que o eveneto tenha sido invocado uma vez pra o lance
    })

    //Garantindo que o valor emitido seja o valor inserido
    test('emite o valor esperado de um lance valido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })

        const input = wrapper.find('input')
        input.setValue(400)

        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')

        const valorDoLance = parseInt(lancesEmitidos[0][0])

        expect(valorDoLance).toBe(400) //Esperamos que o valor emitido no lance seja o mesmo que o valor inserido no input
    })
    //Testando valores invalidos, se a mensagem de erro irá aparecer
    //Criando testes assincronos
    test('não são aceitos lances com valores menores do que o minimo informado', async () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })

        const input = wrapper.find('input')
        input.setValue(100)

        wrapper.trigger('submit')

        //Aguardando pelo nextTick, ou seja, aguardando que o DOM seja atualizado, para prosseguir
        await wrapper.vm.$nextTick()

        const msgErro = wrapper.find('p.alert').element.textContent //Pegando o elemento p que possui a class alert de dentro do componente

        const msgEsperada = 'O valor mínimo para o lance é de R$ 300'

        expect(msgErro).toContain(msgEsperada) //Esperamos que a mensagem de erro contenha a mensagem esperada
    })
})