import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

//Encontrando elementos do HTML
test('Não aceita lance com valor menor do que zero', () => { //O primeiro parametro é a descrição do que iremos testar, o segundo parametro é a função que irá conter o teste
    const wrapper = mount(Lance) //Retornando para a variavel o empacotador do mount

    const input = wrapper.find('input') //Usando o método find para buscar elemento do HTML, como o input
    input.setValue(-100)

    expect(input).toBeTruthy() //Esperamos que wrapper seja verdadeiro, tenha sido montado com sucesso
})