import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

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