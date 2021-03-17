import {default as repository} from './Repository'
import { injectFeedInfo } from './SizhiDefine'
test('simple repository',()=>{
    expect(repository).toBeDefined()
    expect(repository.defines).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ 
                id: 'nielinjie',
                publish: expect.arrayContaining([
                    expect.objectContaining({
                        category: 'work'
                    })
                ])
            })
        ])
    )
})

test('injected',()=>{
     expect(repository).toBeDefined();
     const define= repository.defines[0]
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