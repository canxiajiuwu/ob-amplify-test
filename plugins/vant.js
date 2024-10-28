import { Switch, PullRefresh, Swipe, SwipeItem } from 'vant'
import Vue from 'vue'
import dataError from '@/components/global/dataError'
import dataNoResult from '@/components/global/dataNoResult'
import dataLoading from '@/components/global/dataLoading'
import commonReminder from '@/components/global/commonReminder'
import topMsgPop from '@/components/global/topMsgPop'
import cardPacks from '@/components/global/cardPacks'
import drawer from '@/components/global/drawer'
import globalFilter from '@/components/global/globalFilter'
import nuxtimg from '@/components/global/nuxtimg'

import 'vant/lib/pull-refresh/index.css'
;[
  dataError,
  dataNoResult,
  dataLoading,
  commonReminder,
  topMsgPop,
  cardPacks,
  drawer,
  globalFilter,
  nuxtimg,
  Switch,
  PullRefresh,
  Swipe,
  SwipeItem
].map((comItem) => Vue.use(comItem))
