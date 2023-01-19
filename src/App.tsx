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
import { isRight, Either } from 'fp-ts/Either';
import { Alert, Snackbar } from '@mui/material';
import { ErrorResponse, TrendSummary } from 'components/container/models/trend';
import TrendService from 'components/container/services/trend';

container.register('TrendClient', { useClass: TrendAPIClient });
const trendService = container.resolve<TrendService>('TrendClient');

const App: React.FC = () => {
  const [error, setError] = React.useState<ErrorResponse | undefined>(
    undefined,
  );
  const [snackbarOpener, setSnackbarOpener] = React.useState<boolean>(false);
  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpener(false);
  };

  const [respTrendSummaries, setTrendSummaries] = React.useState<
    TrendSummary[]
  >([]);

  React.useEffect(() => {
    trendService
      .indexSummary('v1/trends?page=0&counts=100')
      .then((r: Either<ErrorResponse, TrendSummary[]>) => {
        if (isRight(r)) {
          setTrendSummaries(r.right);
        } else {
          setSnackbarOpener(true);
          setError(r.left);
        }
      })
      .catch((_) => {});
  }, []);

  return (
    <div>
      <Snackbar
        open={snackbarOpener}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
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
    </div>
  );
};

export default App;
