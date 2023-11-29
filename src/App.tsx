import { useState, useMemo, useEffect } from 'react'
import './App.css'
import { Layout, Flex, Select, SelectProps, Button, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select'
import { useQuery } from '@tanstack/react-query';
import { getPackageDetails, listPackages, listLanguages } from './services';
import type { LanguagesResponse, PackageDetailsResponse, PackageListResponse } from './types';
import { useDebounce } from './hooks';
import Metadata from './pages/Metadata';
import Downloads from './pages/Downloads';
import Languages from './pages/Languages';
import Recommendation from './pages/Recommendation';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography

function App() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [packages, setPackages] = useState([])

  const { data: list, refetch: refetchList } = useQuery<PackageListResponse>({
    queryKey: ['npm-package-list'],
    queryFn: () => listPackages({ q: debouncedSearch, size: 10 }),
    enabled: Boolean(debouncedSearch),
    retry: false
  })

  const { data: details, refetch: refetchDetails, isSuccess: detailsSuccess } = useQuery<PackageDetailsResponse>({
    queryKey: ['npm-package-details'],
    queryFn: () => getPackageDetails({ names: packages }),
    enabled: false
  })

  const languageParams = details ? Object.values(details).map(pkg => {
    const tokens = pkg.collected.metadata.links.repository.split('/')
    const tokenLength = tokens.length

    return { owner: tokens[tokenLength - 2], repo: tokens[tokenLength - 1] }
  }) : []

  const { refetch: refetchLanguages } = useQuery<LanguagesResponse[]>({
    queryKey: ['languages-list'],
    queryFn: () => listLanguages(languageParams),
    enabled: detailsSuccess
  })

  useEffect(() => {
    refetchLanguages()
  }, [details])


  useEffect(() => {
    refetchList()
  }, [debouncedSearch])

  const fetchDetails = () => {
    refetchDetails()
  }

  const handleSearch: SelectProps["onSearch"] = (string) => {
    console.log("onSearch", string, options)
    setSearch(string)
  }

  const handleSelect: SelectProps["onChange"] = (string, options) => {
    if (string) {
      console.log("onChange", string, options)
      setPackages(string.slice(0, 2))
    }
  }

  const options: SelectProps["options"] = useMemo(() => {
    return list?.results?.map((opt) => {
      return {
        label: opt.package.name,
        value: opt.package.name,
      }
    }) as DefaultOptionType[] | undefined
  }, [list])


  return (
    <Layout style={{ width: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}><Title style={{ color: 'white', textAlign: 'center', width: '100%' }}>NPM Package Comparator</Title></Header>
      <Content >
        <Flex>
          <Select
            value={packages}
            showSearch
            searchValue={search}
            onSearch={handleSearch}
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            // defaultValue={['a10', 'c12']}
            onChange={handleSelect}
            options={options || []}
          />
          <Button disabled={packages.length < 2} onClick={fetchDetails}>Compare</Button>
        </Flex>
        <Flex vertical justify='stretch' >
          <Metadata />
          <Languages />
          <Downloads />
          <Recommendation />
        </Flex>
      </Content>
    </Layout>
  )
}

export default App
