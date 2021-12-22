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

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1005,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 2
    },
    {
        id: 3,
        valor: 1099,
        data: '2020-06-13T18:19:44.871Z',
        leilao_id: 3
    },
]

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

describe('Um leiloeiro exibe os lances existentes', () => {
    test('Não mostra o aviso de "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(false) //Esperando que o alerta não seja exibido, que dê tudo certo
    })

    test('Leiloeiro possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const lista = wrapper.find('.list-inline')

        expect(lista.exists()).toBe(true) //Esperando que exista uma lista de lances do leilão
    })
})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
    test('Mostra o maior lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const maiorLance = wrapper.find('.maior-lance')

        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099') //Esperando que no maiorLance contenha a mesma mensagem escrita ao lado
    })

    test('Mostra o menor lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const menorLance = wrapper.find('.menor-lance')

        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
    })
})