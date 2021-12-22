import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro da casa do Código',
        lanceInicial: 50,
        descricao: 'Livro sobre VueJS'
    },
    {
        produto: 'Livro da casa do Código',
        lanceInicial: 50,
        descricao: 'Livro sobre Teste Unitário'
    }
]

describe('Um avaliador que se conecta com a API', () => {
    test('Mostra todos os leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        //Usando findAll para pegar todos os elementos
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length

        expect(totalLeiloesExibidos).toBe(leiloes.length) //Esperamos que o total de leiloes exibidos seja igual ao total de leiloes existentes
    })

    test('Não há leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([])

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length

        expect(totalLeiloesExibidos).toBe(0)
    })
})