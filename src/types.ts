export interface PackageList {
    package: Record<string, any>,
    score: Record<string, any>,
    searchScore: number
}

export interface PackageListResponse {
    total: number,
    results: PackageList[]
}

export interface PackageDetailsResponse {
    [key: string]: PackageDetails
}

export interface PackageDetails {
    analyzedAt: string,
    collected: {
        metadata: Metadata,
        npm: Npm,
        github: Github,
        source: Source
    },
    evaluation: Evaluation,
    score: Score
}

export interface LanguagesParams {
    owner: string,
    repo: string
}

export interface LanguagesResponse {
    [key: string]: number
}

export interface Github {
    homepage: string;
    starsCount: number;
    forksCount: number;
    subscribersCount: number;
    issues: Issues;
    contributors: Contributor[];
    commits: Commit[];
    statuses: Status[];
}

export interface Commit {
    from: Date;
    to: Date;
    count: number;
}

export interface Contributor {
    username: string;
    commitsCount: number;
}

export interface Issues {
    count: number;
    openCount: number;
    distribution: { [key: string]: number };
    isDisabled: boolean;
}

export interface Status {
    context: string;
    state: string;
}

export interface Metadata {
    name: string;
    scope: string;
    version: string;
    description: string;
    date: Date;
    author: Author;
    publisher: Publisher;
    maintainers: Publisher[];
    repository: Repository;
    links: Links;
    license: string;
    dependencies: Dependencies;
    devDependencies: { [key: string]: string };
    peerDependencies: Dependencies;
    releases: Commit[];
    hasTestScript: boolean;
    hasSelectiveFiles: boolean;
    readme: string;
}

export interface Author {
    name: string;
}

export interface Publisher {
    username: string;
    email: string;
}

export interface Repository {
    type: string;
    url: string;
}

export interface Links {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
}

export type Dependencies = string[]

export interface Npm {
    downloads: Commit[];
    starsCount: number;
}

export interface Github {
    homepage: string;
    starsCount: number;
    forksCount: number;
    subscribersCount: number;
    issues: Issues;
    contributors: Contributor[];
    commits: Commit[];
    statuses: Status[];
}

export interface Source {
    files: Files;
    linters: string[];
    outdatedDependencies: Record<string, OutdatedDependencies>;
}

export interface Files {
    readmeSize: number;
    testsSize: number;
    hasNpmIgnore: boolean;
}

export interface OutdatedDependencies {
    required: string;
    stable: string;
    latest: string;
}

export interface Evaluation {
    quality: Quality;
    popularity: Popularity;
    maintenance: Maintenance;
}

export interface Maintenance {
    releasesFrequency: number;
    commitsFrequency: number;
    openIssues: number;
    issuesDistribution: number;
}

export interface Popularity {
    communityInterest: number;
    downloadsCount: number;
    downloadsAcceleration: number;
    dependentsCount: number;
}

export interface Quality {
    carefulness: number;
    tests: number;
    health: number;
    branding: number;
}

export interface Score {
    final: number;
    detail: Detail;
}

export interface Detail {
    quality: number;
    popularity: number;
    maintenance: number;
}