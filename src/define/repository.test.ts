import {default as repository} from './Repository'
test('simple repository',()=>{
    expect(repository).toBeDefined()
    expect(repository.defines).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ 
                username: 'nielinjie'
            })
        ])
    )
})