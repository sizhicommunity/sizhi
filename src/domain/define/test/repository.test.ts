import  repository from './mockRepository'
import { injectFeedInfo, nominalDefine } from '../SizhiDefine'



test('simple repository',()=>{
    expect(repository).toBeDefined()
    const defines = repository.defines.map(nominalDefine).value();
    expect(defines).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ 
                name: 'nielinjie',
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
     const defines = repository.defines.map(nominalDefine).value();
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