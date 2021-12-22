import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

//Montando um teste para verificar se o componente Lance, foi montado corretamente
test('Não aceita lance com valor menor do que zero', () => { //O primeiro parametro é a descrição do que iremos testar, o segundo parametro é a função que irá conter o teste
    const wrapper = mount(Lance) //Retornando para a variavel o empacotador do mount
    expect(wrapper).toBeTruthy() //Esperamos que wrapper seja verdadeiro, tenha sido montado com sucesso
})