import React, { useEffect, useContext, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HomeHeaderPanel,
  HomeHeaderItemPanel,
  BlockPanel,
  ContentTable,
  TableMorePanel,
  HighLightValue,
} from './styled'
import Content from '../../components/Content'
import {
  TableTitleRow,
  TableTitleItem,
  TableContentRow,
  TableContentItem,
  TableMinerContentItem,
} from '../../components/Table'
import { shannonToCkb } from '../../utils/util'
import { parseTime, parseSimpleDate } from '../../utils/date'
import { BLOCK_POLLING_TIME } from '../../utils/const'
import { localeNumberString, handleHashRate, handleDifficulty } from '../../utils/number'
import { adaptMobileEllipsis } from '../../utils/string'
import { isMobile } from '../../utils/screen'
import browserHistory from '../../routes/history'
import { StateWithDispatch } from '../../contexts/providers/reducer'
import { AppContext } from '../../contexts/providers'
import { getLatestBlocks } from '../../service/app/block'
import getStatistics from '../../service/app/statistics'
import i18n from '../../utils/i18n'
import OverviewCard, { OverviewItemData } from '../../components/Card/OverviewCard'

const BlockchainItem = ({ blockchain }: { blockchain: BlockchainData }) => {
  return (
    <HomeHeaderItemPanel
      clickable={!!blockchain.clickable}
      onKeyPress={() => {}}
      onClick={() => {
        if (blockchain.clickable) browserHistory.push('./charts')
      }}
    >
      <div className="blockchain__item__value">{blockchain.value}</div>
      <div className="blockchain__item__name">{blockchain.name}</div>
      {blockchain.tip && <div className="blockchain__item__tip__content">{blockchain.tip}</div>}
    </HomeHeaderItemPanel>
  )
}

const BlockValueItem = ({ value, to }: { value: string; to: string }) => {
  return (
    <HighLightValue>
      <Link to={to}>
        <span id="monospace">{value}</span>
      </Link>
    </HighLightValue>
  )
}

interface TableTitleData {
  title: string
  width: string
}

interface TableContentData {
  width: string
  to?: any
  content: string
}

interface BlockchainData {
  name: string
  value: string
  tip: string
  clickable?: boolean
}

const parseHashRate = (hashRate: string | undefined) => {
  return hashRate ? handleHashRate(Number(hashRate) * 1000) : '- -'
}

const getTableContentDataList = (block: State.Block) => {
  return [
    {
      width: '14%',
      to: `/block/${block.number}`,
      content: localeNumberString(block.number),
    },
    {
      width: '14%',
      content: `${block.transactionsCount}`,
    },
    {
      width: '20%',
      content: localeNumberString(shannonToCkb(block.reward)),
    },
    {
      width: '37%',
      content: block.minerHash,
    },
    {
      width: '15%',
      content: parseSimpleDate(block.timestamp),
    },
  ] as TableContentData[]
}

const parseBlockTime = (blockTime: string | undefined) => {
  return blockTime ? parseTime(Number(blockTime)) : '- -'
}

const blockchainDataList = (statistics: State.Statistics) => {
  return [
    {
      name: i18n.t('blockchain.best_block'),
      value: localeNumberString(statistics.tipBlockNumber),
      tip: i18n.t('blockchain.best_block_tooltip'),
    },
    {
      name: i18n.t('block.difficulty'),
      value: handleDifficulty(statistics.currentEpochDifficulty),
      tip: i18n.t('blockchain.difficulty_tooltip'),
      clickable: true,
    },
    {
      name: i18n.t('blockchain.hash_rate'),
      value: parseHashRate(statistics.hashRate),
      tip: i18n.t('blockchain.hash_rate_tooltip'),
      clickable: true,
    },
    {
      name: i18n.t('blockchain.average_block_time'),
      value: parseBlockTime(statistics.currentEpochAverageBlockTime),
      tip: i18n.t('blockchain.average_block_time_tooltip'),
    },
  ]
}

const blockCardItems = (block: State.Block) => {
  return [
    {
      title: i18n.t('home.height'),
      content: <BlockValueItem value={localeNumberString(block.number)} to={`/block/${block.number}`} />,
    },
    {
      title: i18n.t('home.transactions'),
      content: localeNumberString(block.transactionsCount),
    },
    {
      title: i18n.t('home.block_reward'),
      content: localeNumberString(shannonToCkb(block.reward)),
    },
    {
      title: i18n.t('block.miner'),
      content: <BlockValueItem value={adaptMobileEllipsis(block.minerHash, 13)} to={`/address/${block.minerHash}`} />,
    },
    {
      title: i18n.t('home.time'),
      content: parseSimpleDate(block.timestamp),
    },
  ] as OverviewItemData[]
}

export default ({ dispatch }: React.PropsWithoutRef<StateWithDispatch & RouteComponentProps>) => {
  const { homeBlocks = [], statistics } = useContext(AppContext)
  const [t] = useTranslation()

  const TableTitles = useMemo(() => {
    return [
      {
        title: t('home.height'),
        width: '14%',
      },
      {
        title: t('home.transactions'),
        width: '14%',
      },
      {
        title: t('home.block_reward'),
        width: '20%',
      },
      {
        title: t('block.miner'),
        width: '37%',
      },
      {
        title: t('home.time'),
        width: '15%',
      },
    ]
  }, [t])

  useEffect(() => {
    getLatestBlocks(dispatch)
    getStatistics(dispatch)
    const listener = setInterval(() => {
      getLatestBlocks(dispatch)
      getStatistics(dispatch)
    }, BLOCK_POLLING_TIME)
    return () => {
      if (listener) {
        clearInterval(listener)
      }
    }
  }, [dispatch])

  return (
    <Content>
      <HomeHeaderPanel>
        <div className="blockchain__item__container">
          {blockchainDataList(statistics).map((data: BlockchainData) => {
            return <BlockchainItem blockchain={data} key={data.name} />
          })}
        </div>
      </HomeHeaderPanel>
      <BlockPanel className="container">
        {isMobile() ? (
          <ContentTable>
            <div className="block__green__background" />
            <div className="block__panel">
              {homeBlocks.map((block: State.Block) => {
                return <OverviewCard key={block.number} items={blockCardItems(block)} />
              })}
            </div>
          </ContentTable>
        ) : (
          <ContentTable>
            <TableTitleRow>
              {TableTitles.map((data: TableTitleData) => {
                return <TableTitleItem width={data.width} title={data.title} key={data.title} />
              })}
            </TableTitleRow>
            {homeBlocks.map((block: State.Block) => {
              return (
                block && (
                  <TableContentRow key={block.number}>
                    {getTableContentDataList(block).map((data: TableContentData, index: number) => {
                      const key = index
                      return (
                        <React.Fragment key={key}>
                          {data.content === block.minerHash ? (
                            <TableMinerContentItem width={data.width} content={data.content} />
                          ) : (
                            <TableContentItem width={data.width} content={data.content} to={data.to} />
                          )}
                        </React.Fragment>
                      )
                    })}
                  </TableContentRow>
                )
              )
            })}
          </ContentTable>
        )}
        <TableMorePanel>
          <div>
            <Link to="/block/list">
              <div className="table__more">{t('home.more')}</div>
            </Link>
          </div>
        </TableMorePanel>
      </BlockPanel>
    </Content>
  )
}
