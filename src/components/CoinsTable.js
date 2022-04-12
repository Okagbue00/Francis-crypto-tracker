import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Pagination } from '@material-ui/lab';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useHistory();

    const {currency, symbol} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    console.log(coins);

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const darkTheme = createTheme ({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ));
    };

    const useStyles = makeStyles (() => ({
        row: {
            backgroundColor: "rgba(85, 85, 85, 0.8)",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "rgba(144, 135, 139, 0.8)",
            },
            fontFamily: "Ubuntu",
        },
            pagination:{
                "& .MuiPaginationItem-root":{color:"gold", fontSize: 22},
            
        },

    }));



    const classes = useStyles();


  return (
      <ThemeProvider theme={darkTheme}>
          <Container style={{textAlign: "center"}}>
              <Typography
              variant='h4'
              style={{margin:18, fontFamily:"Ubuntu", color: "orange"}}>Latest Cryptocurrency Market Cap Now</Typography>

              <TextField label="Search For a Crypto Currency..." variant="outlined" style={{marginBottom:20, width:"100%"}} onChange={(e) => setSearch(e.target.value)} />

              <TableContainer>
                  {loading ? (
                      <LinearProgress style={{backgroundColor: "gold"}} />
                  ) : (
                    <Table>
                      <TableHead style={{background: "blue"}}>
                      <TableRow>
                          {["Coin", "Amount", "Price Change 24hrs", "Total Market Cap" ].map((head) => 
                            <TableCell style={{color:"white", fontWeight: "800", fontFamily:"Ubuntu",}}
                            key = {head}
                            align={head === "Coin" ? "" : "right"}>{head}</TableCell>
                          )}
                      </TableRow>
                         </TableHead>
                         <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1)* 10 + 10).map((row)=> {
                             const profit = row.price_change_percentage_24h > 0;
                             return (
                                 <TableRow onClick={() => navigate.push(`/coins/${row.id}`)}
                                 className={classes.row}
                                 key = {row.name}
                                 >
                                     <TableCell component="th" scope="row" style={{ display: "flex", gap: 15, }}>
                                         <img src={row?.image} alt={row.name} height="50" style={{marginBottom: 10}} />
                                         <div style={{display:"flex", flexDirection:"column"}}>
                                             <span style={{textTransform:"uppercase", fontSize:27,}}>{row.symbol}</span>
                                             <span style={{color:"brown"}}>{row.name}</span>
                                         </div>
                                     </TableCell>

                                     <TableCell align='right'>{symbol}{" "} {numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                                     <TableCell  align='right' style={{color: profit > 0 ? "green" : "red", fontWeight: 600,}}>
                                         {profit && "+"}
                                         {row.price_change_percentage_24h.toFixed(2)}%
                                     </TableCell>
                                     <TableCell align='right'>
                                         {symbol}{" "}
                                         {numberWithCommas(
                                             row.market_cap.toString().slice(0, -6)
                                         )}
                                         M
                                     </TableCell>
                                 </TableRow>
                             );
                         })}
                      </TableBody>
                    </Table>
                  )}


              </TableContainer>
            
              <Pagination style={{padding: 23, width:"100%", display:"flex", justifyContent: "center",}} classes={{ul:classes.pagination}} count={(handleSearch()?.length / 10).toFixed(0)}
              onChange={(_, value) => {setPage(value); window.scroll(0, 450)}}></Pagination>

          </Container>
      </ThemeProvider>
     
    
  );
};

export default CoinsTable;