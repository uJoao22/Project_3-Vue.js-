import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = { //Simulando a execução do VueRouter
    push: jest.fn() //Passando como atributo uma função jest
}

describe('Um novo leilão deve ser criado', () => {
    test('Dado o formulario preenchido, um leilão deve ser criado', () => {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        })

        wrapper.find('.produto').setValue('Um livro da casa do código')
        wrapper.find('.descricao').setValue('Conteudo de primeira')
        wrapper.find('.valor').setValue(50)

        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled() //Esperando que o createLeilao tenha sido chamado
    })
})