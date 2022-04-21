import type { NextApiRequest, NextApiResponse } from 'next'

type VersionType = {
    version: string
    build: number
}

export default function handler(
    _: NextApiRequest,
    res: NextApiResponse<VersionType>
) {
    res.status(200).json({ version: '0.0.1', build: 1 })
}
