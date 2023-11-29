import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flex, Typography, Alert } from 'antd'
import { PackageDetailsResponse } from '../types'

const { Title, Text, Link } = Typography

type Props = {}

type Rating = {
    name: string
    description: string
    link: string
    rating: number
    health: number
    stars: number
    downloads: number
}

const cardStyle = { border: '1px solid cornflowerblue', borderRadius: 10 }

const Recommendation = (props: Props) => {
    const { data, status } = useQuery<PackageDetailsResponse>({
        queryKey: ['npm-package-details']
    })

    const mappedData = useMemo(() => {
        if (data) {
            return Object.entries(data).map(([key, ele]) => {
                const evaluation = ele.evaluation
                const collected = ele.collected
                const stars = collected.github.starsCount
                const health = evaluation.quality.health
                const carefulness = evaluation.quality.carefulness
                const tests = evaluation.quality.tests
                const communityInterest = evaluation.popularity.communityInterest
                const downloads = evaluation.popularity.downloadsCount

                const rating: Rating = {
                    name: key,
                    description: collected.metadata.description,
                    link: collected.metadata.links.homepage,
                    health,
                    downloads,
                    stars,
                    rating: 0
                }

                rating.rating = ((communityInterest * 0.2) + (downloads * 0.5) + (tests * 0.15) + (carefulness * 0.15))
                return rating
            }).sort((a, b) => { if (a.rating > b.rating) { return -1 } else { return 1 } })
        }
        else {
            return []
        }
    }, [data])

    const recommended = mappedData[0]

    if (status === 'success') {
        return (
            <div style={{ backgroundColor: 'white' }}>
                <Title >Recommendation</Title>
                <Flex vertical gap={'middle'} style={{ boxShadow: '2px 2px 5px cornflowerblue', padding: 20 }}>
                    <div style={{ ...cardStyle, width: '100%', padding: '20px 10px' }}>
                        <Title level={3} style={{ margin: 0 }}>
                            <Text></Text>{`${recommended.name} is ${(mappedData[0].rating / mappedData[1].rating).toFixed(3)} times better`}
                        </Title>
                    </div>
                    <Flex gap={'middle'} justify='flex-end'>
                        <Flex vertical gap={'middle'} style={{ flex: 1, textAlign: 'left' }}>
                            <Flex gap={'small'}>
                                <Text strong color='secondary'>Recommended: </Text>
                                <Text>{recommended.name}</Text>
                            </Flex>
                            <Text>{recommended.description}</Text>
                            <div><Text>Visit this link for more information</Text> <Link href={recommended.link} target='_blank'>Homepage</Link></div>
                        </Flex>
                        <Flex vertical align='center' style={{ ...cardStyle, padding: 20 }}>
                            <Text strong color='secondary'>Downloads</Text>
                            <Text>{recommended.downloads.toFixed(0)}</Text>
                        </Flex>
                        <Flex vertical style={{ ...cardStyle, padding: 20 }}>
                            <Text strong color='secondary'>Stars</Text>
                            <Text>{recommended.stars}</Text>
                        </Flex>
                        <Flex vertical style={{ ...cardStyle, padding: 20 }}>
                            <Text strong color='secondary'>Health</Text>
                            <Text>{recommended.health * 100 + "%"}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </div>
        )
    }
}

export default Recommendation