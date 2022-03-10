import * as React from "react"
import Layout from "../layout";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Grid item xs={12}>
      <title>Home Page</title>
      <Typography variant="body1" color="initial">
        因為https://bugofbook.github.io/My-app/#/己經有段時間沒有修改了，使用gatsby.js + ReactHook + meterial-UI重新翻修了一次。
      </Typography>
      <Typography variant="body1" color="initial">
        裡面的遊戲是為了練習JS的演算法而做的，比較不注重畫面。
      </Typography>
      <Typography variant="body1" color="initial">
        預定要完成的功能：
      </Typography>
      <Typography variant="body1" color="initial">
        1. 用AWS的雲服務來上傳記錄
      </Typography>
      <Typography variant="body1" color="initial">
        2. 演算法的更新修改
      </Typography>
      </Grid>
    </Layout>
  )
}

export default IndexPage
