import  repository from '../Repository'
import { injectFeedInfo, nominalCategorized, nominalDefine } from '../SizhiDefine'


test('simple repository',()=>{
    expect(repository).toBeDefined()
    const defines = repository.defines.map(nominalDefine);
    expect(defines).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ 
                id: 'nielinjie',
                publish: expect.arrayContaining([
                    expect.objectContaining({
                        category: 'mock'
                    })
                ])
            })
        ])
    )
})

test('injected',()=>{
     expect(repository).toBeDefined();
     const defines = repository.defines.map(nominalDefine);
     const define= defines[0]
     const injected= injectFeedInfo(define)
     expect(injected).toEqual(
       expect.objectContaining({
         id: "nielinjie",
         publish: expect.arrayContaining([
           expect.objectContaining({
             category: "work",
             objects: expect.arrayContaining([
               expect.objectContaining({
                 info: expect.objectContaining({
                   defineUrl: "sizhi:nielinjie",
                   feedPath: "publish/work",
                 }),
               }),
             ]),
           }),
         ]),
         follow: expect.arrayContaining([
           expect.objectContaining({
             category: "work",
             objects: expect.arrayContaining([
               expect.objectContaining({
                 info: expect.objectContaining({
                   defineUrl: "sizhi:nielinjie",
                   feedPath: "follow/work",
                 }),
               }),
             ]),
           }),
         ]),
       })
     );
})