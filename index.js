import Fastify from 'fastify'
import swagger from '@fastify/swagger'

for (const version of ['3.0.3', '3.1.0']) {
  const app = Fastify()
  await app.register(swagger, {
    openapi: { openapi: version, info: { title: 'repro', version: '1.0.0' } }
  })

  app.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          nullableKeyword: { type: 'string', nullable: true },
          typeArray: { type: ['string', 'null'] },
          multipleExamples: { type: 'string', examples: ['foo', 'bar'] }
        }
      }
    }
  }, async () => ({}))

  await app.ready()
  const { properties } = app.swagger().paths['/'].post.requestBody.content['application/json'].schema
  console.log(version, JSON.stringify(properties, null, 2))
}