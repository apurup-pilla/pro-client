
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import $ from "jquery";
import moment from "moment";
import "daterangepicker";
import { Button } from "@mui/material";

const DateFilter = ({ setRange, range }) => {
  const pickerRef = useRef();
  const [clearKey, setClearKey] = useState(0); // Force re-initialization

  useEffect(() => {
    const cb = (start, end, label) => {
      if (start && end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        setRange({ startDate: start, endDate: end, label });
      }
    };

    $('#reportrange span').html("Date Filter");

    $('#reportrange').daterangepicker({
      autoUpdateInput: false,
      locale: { cancelLabel: 'Clear',  format: 'MMMM D, YYYY' },
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      
    }, cb);

    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
      cb(picker.startDate, picker.endDate, picker.chosenLabel);
    });

    $('#reportrange').on('cancel.daterangepicker', function (ev, picker) {
      $('#reportrange span').html("Date Filter");
      setRange(null);
    });

    return () => {
      $('#reportrange').data('daterangepicker')?.remove(); // Cleanup on unmount or re-init
    };
  }, [clearKey]);

  // Clear date function
  const handleClear = () => {
    $('#reportrange span').html("Date Filter");
    setRange(null);
    setClearKey(prev => prev + 1); // Reinitialize to fully reset
  };

  return (
    <div style={{ display: "flex", gap: "10px", maxWidth: "500px" }}>
      <div
        id="reportrange"
        ref={pickerRef}
        style={{
          background: "#fff",
          cursor: "pointer",
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          height: "40px"
        }}
      >
        <i className="fa fa-calendar" /> &nbsp;
        <span></span> <i className="fa fa-caret-down" />
      </div>
      {
        (range?.startDate && range.endDate) &&

        <Button variant="outlined"
          onClick={handleClear}
          sx={{
            border: "1px solid #d9534f",
            color: '#d9534f',
            textTransform: 'none'
          }}
        > Clear filter
        </Button>
      }
    </div>
  );
};

export default DateFilter;




  // useEffect(() => {
  //   const cb = (start, end, label) => {
  //     if (start && end) {
  //       $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  //       setRange({ startDate: start, endDate: end, label });
  //     }
  //   };

  //   $('#reportrange span').html("Date Filter");

  //   $('#reportrange').daterangepicker({
  //     autoUpdateInput: false,
  //     locale: { cancelLabel: 'Clear',  format: 'MMMM D, YYYY' },
  //     ranges: {
  //       'Today': [moment(), moment()],
  //       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  //       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  //       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  //       'This Month': [moment().startOf('month'), moment().endOf('month')],
  //       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  //     },
      
  //   }, cb);

  //   $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
  //     cb(picker.startDate, picker.endDate, picker.chosenLabel);
  //   });

  //   $('#reportrange').on('cancel.daterangepicker', function (ev, picker) {
  //     $('#reportrange span').html("Date Filter");
  //     setRange(null);
  //   });

  //   return () => {
  //     $('#reportrange').data('daterangepicker')?.remove(); // Cleanup on unmount or re-init
  //   };
  // }, [clearKey]);