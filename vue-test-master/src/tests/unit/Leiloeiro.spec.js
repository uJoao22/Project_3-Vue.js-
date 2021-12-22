import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises' //Importando a biblioteca flushPromises

jest.mock('@/http') //Usando o poder do JEST, simulando os métodos de http

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 50,
    descricao: 'Um livro bem bacana sobre VUE'
}

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('Avisa quando não existem lances', async () => {
        //Simulando a primeira chamada do método e retornando o que determinarmos
        getLeilao.mockResolvedValueOnce(leilao) //RETORNO: Objeto Leilao
        getLances.mockResolvedValueOnce([]) //RETORNO: Objeto

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises() //Usando o flashPromises para agurdar todas as promesas serem concluidas

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true) //Esperamos que o alerta exista, esteja aparecendo, se existir retorna true, esperamos true
    })
})