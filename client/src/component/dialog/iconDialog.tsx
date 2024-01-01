import Dialog from "@mui/material/Dialog";
import { Box, Card, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import MuiIcon from "../iconComponent/muiIcon";

IconDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedIcon: PropTypes.string.isRequired,
};

export default function IconDialog(props) {
  const { onClose, selectedIcon, open } = props;
  const [icons, setIcons] = useState(null);
  const [filteredIcons, setFilteredIcons] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleClose = () => {
    onClose(selectedIcon);
  };
  const onloadCallback = (e) => {
    console.log(e);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    setIsDataLoading(true);
    if (!icons || icons.length === 0) {
      fetch("https://api.iconify.design/collection?prefix=material-symbols&pretty=1&limit=9")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIcons(Object.values(data.aliases));
          setFilteredIcons(Object.values(data.aliases));
        });
    }
    setIsDataLoading(false);
  }, []);
  useEffect(() => {
    if (icons && icons.length > 0 && searchText) {
      setFilteredIcons(
        icons.filter((ele) => {
          return ele.includes(searchText);
        })
      );
    } else if (!searchText) {
      setFilteredIcons(icons);
    }
  }, [searchText]);
  return (
    <Dialog onClose={handleClose} open={open} className="m-0 p-0" sx={{ "& div.MuiPaper-root": { borderRadius: "15px !important", padding: "8px" } }}>
      <Card
        className="card bg-white p-0"
        sx={(theme) => {
          return {
            boxShadow: "none",
            ...styles.searchCard,
          };
        }}
      >
        <Box sx={{}} style={{ ...styles.SearchCardInner }}>
          {/* <label style={{ ...styles.searcLabel }}>Search for your favourite food</label> */}
          <div style={{ ...styles.searchContainer }}>
            <div style={{ ...styles.searchIcon }}>
              <svg style={{ ...styles.searchSvg }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div style={{ ...styles.InputContainer }}>
              <input value={searchText} onChange={handleSearch} style={{ ...styles.input }} placeholder="Search for your favourite icon..." />
            </div>
          </div>
        </Box>
      </Card>
      {
        <Card sx={{ margin: "2px" }}>
          <Grid container component={Card} spacing={2} className="card bg-white" style={{ boxShadow: "none", height: "300px", width: "400px", padding: "5px", margin: "0px", overflowY: "scroll" }}>
            {isDataLoading && !filteredIcons && <CircularProgress />}
            {!filteredIcons || filteredIcons.length <= 0 ? (
              <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h4>No Icon Found</h4>
              </Box>
            ) : (
              filteredIcons &&
              filteredIcons.length > 0 &&
              filteredIcons.map((ele, ind, arr) => {
                return (
                  <Grid
                    key={ind}
                    item
                    xs
                    className="d-flex align-items-center justify-content-center p-0"
                    onClick={(e) => {
                      handleListItemClick(`material-symbols:${ele}`);
                      toast.success("Icon selected.");
                    }}
                  >
                    <Box
                      sx={(theme) => {
                        return {
                          boxShadow: theme.shadows[1],
                          borderRadius: "10px",
                          margin: "4px",
                          height: "50px",
                          width: "50px",
                          padding: "0px",
                          cursor: "pointer",
                          "&:hover": {
                            background: "#d9d9d97d",
                          },
                        };
                      }}
                    >
                      <MuiIcon onLoad={onloadCallback} icon={`material-symbols:${ele}`} sx={{ marginTop: "5px", marginLeft: "5px", fontSize: "20px", color: "black", height: "100%", width: "100%" }} />
                    </Box>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Card>
      }
    </Dialog>
  );
}

const styles = {
  searchCard: {
    padding: "1px",
    borderRadius: "10px",
    background: "linear-gradient(-67deg, rgba(#c8d8e7, .7), rgba(255,255,255,.8))",
    overflow: "hidden",
    // boxShadow: "-2px -2px 6px rgba(#fff, .6), 2px 2px 12px #c8d8e7",
    width: "auto",
    margin: "5px 0px 10px 0px",
  },
  SearchCardInner: {
    padding: "16px 16px",
    borderRadius: "10px",
    background: "#f4e3fb",
  },
  searchContainer: {
    display: "flex",
  },
  searchIcon: {
    minWidth: "46px",
    minHeight: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    marginRight: "12px",
    boxShadow: "-2px -2px 6px rgba(#fff, .6), 2px 2px 12px #c8d8e7",
  },
  searchSvg: {
    transform: "translate(-1px, -1px)",
  },
  searcLabel: {
    fontFamily: "Hind, sans-serif",
    display: "block",
    color: "#3c4b66",
    marginBottom: "12px",
    background: "linear-gradient(45deg, rgba(#6b7b8f, 1), #3c4b66)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    webkitTextFillColor: "transparent",
  },
  input: {
    backgroundColor: "#fff",
    padding: "16px 32px",
    border: "none",
    display: "block",
    fontFamily: "Orbitron, sans-serif",
    fontWeight: "600",
    color: "#a9b8c9",
    webkitAppearance: "none",
    transition: "all 240ms ease-out",
    width: "100%",
    placeholder: {
      color: "#6d7f8f",
    },
    focus: {
      outline: "none",
      color: "#6d7f8f",
      backgroundColor: "lighten(#e3edf7, 3%)",
    },
  },

  InputContainer: {
    width: "100%",
    topShadow: "inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3",
    bottomShadow: "inset -2px -2px 4px rgba(255,255,255, .7)",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    before: {
      left: "0",
      top: "0",
      display: "block",
      content: "",
      pointerEvents: "none",
      width: "100%",
      height: "100%",
      position: "absolute",
      boxShadow: "10px",
    },
    after: {
      left: "0",
      top: "0",
      display: "block",
      content: "",
      pointerEvents: "none",
      width: "100%",
      height: "100%",
      position: "absolute",
      boxShadow: "10px",
    },
  },
};
