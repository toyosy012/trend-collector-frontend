import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'App.css';
import { container } from 'tsyringe';
import TrendAPIClient from 'components/container/repositories/api/trend';
import { TrendSummary } from './components/container/models/trend';
import TrendService from './components/container/services/trend';

container.register('TrendClient', { useClass: TrendAPIClient });
const trendService = container.resolve<TrendService>('TrendClient');

const App: React.FC = () => {
  const [respTrendSummaries, setTrendSummaries] = React.useState<
    TrendSummary[]
  >([]);

  React.useEffect(() => {
    trendService
      .indexSummary('v1/trends?page=1&counts=100')
      .then((r: TrendSummary[]) => {
        setTrendSummaries(r);
      })
      .catch((_) => {});
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ width: '10%' }}>
              番号
            </TableCell>
            <TableCell align="center" style={{ width: '65%' }}>
              トレンド名
            </TableCell>
            <TableCell align="center" style={{ width: '25%' }}>
              取得日時
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {respTrendSummaries.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" style={{ width: '10%' }}>
                {index + 1}
              </TableCell>
              <TableCell align="center" style={{ width: '65%' }}>
                {row.name}
              </TableCell>
              <TableCell align="center" style={{ width: '25%' }}>
                {row.updatedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default App;
