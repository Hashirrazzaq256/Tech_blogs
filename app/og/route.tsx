import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FAFAFA',
            fontFamily: 'Inter, system-ui',
            fontWeight: 700,
          }}
        >
          <span style={{ color: '#D97757', fontSize: 32 }}>Industrial</span>
          <span style={{ marginTop: 16 }}>Blog</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}