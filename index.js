// doanh thu
$(document).ready(function() {
    $('.res').addClass('hide');

    $('.res-btn .btn').on('click', function() {
        result();
        let getId = $(this).attr('id');
        $(`.res`).map(function(i, val){
           if(i == getId) {
               $(val).addClass('show');
               $(val).removeClass('hide')
           } else {
            $(val).addClass('hide');
            $(val).removeClass('show')
           }
        })
    })

    function result() {
        $($('.res')[0]).removeClass('hide');
        $('.res').val('');
        const nam = $('input[name="soNam"]').val();
        let data = chiPhi(doanhThu(nam), nam);
        $('.res-table-1').html('')
        for(let i = 0; i < nam; i++) {
            let loiNhuan = data.arrTongDT[i].toFixed(2)- data.arrTongCP[i].toFixed(2);
            let element = `<tr>
                                <th class="text-primary" scope="row" style="text-align: center">${i+1}</th>
                                <td class="text-primary" style="text-align: center">${data.arrTongDT[i].toFixed(2)}</td>
                                <td class="text-primary" style="text-align: center">${data.arrTongCP[i].toFixed(2)}</td>
                                <td class="text-primary" style="text-align: center">${loiNhuan.toFixed(2)}</td>
                            </tr>`;
            $('.res-table-1').append(element);
        }
        // chi phi tung thanh phan
        $('.res-table-2').html('')
        for(let i = 0; i < nam; i++) {
            let element = `<tr>
                                <th class="text-primary" scope="row" style="text-align: center">${i+1}</th>
                                <td class="text-primary" style="text-align: center">${data.CP.luong[i].toFixed(2)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.tongLuong[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.BHXH[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.daoTao[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.dienNuoc[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.quangCao[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.suaChua[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.quanLy[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.phongNgu[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.CP.nhaHang[i].toFixed(1)}</td>
                            </tr>`;
            $('.res-table-2').append(element);
        }
        // doanh thu tung thanh phan
        $('.res-table-3').html('')
        for(let i = 0; i < nam; i++) {
            let element = `<tr>
                                <th class="text-primary" scope="row" style="text-align: center">${i+1}</th>
                                <td class="text-primary" style="text-align: center">${data.DT.congSuat[i]}</td>
                                <td class="text-primary" style="text-align: center">${data.DT.giaPhong[i].toFixed(2)}</td>
                                <td class="text-primary" style="text-align: center">${data.DT.nhaHang[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.DT.phong[i].toFixed(1)}</td>
                                <td class="text-primary" style="text-align: center">${data.DT.tongDoanhThu[i].toFixed(1)}</td>
                            </tr>`;
            $('.res-table-3').append(element);
        }
    }
   
    function doanhThu(nam) {
        // danh thu
        const soPhong = $('input[name="soPhong"]').val();
        const giaPhong = $('input[name="giaPhong"]').val()/1000;
        const TDTangGia = $('input[name="giaTang"]').val();
        const DTNhaHang = $('input[name="nhaHang"]').val();
        const congSuat1 = $('input[name="congSuat1"]').val();
        const congSuat2 = $('input[name="congSuat2"]').val();
        const congSuat3 = $('input[name="congSuat3"]').val();
        let tongDoanhThu = 0;
        let TDTNam = [], DTNam = [], DTNamNhaHang = [];
        let DT = {
            congSuat: [],
            giaPhong: [],
            nhaHang: [],
            phong: [],
            tongDoanhThu: []
        };
        for (let i = 1; i <= nam; i++) {
            let doanhThuPhong = 0, congSuat = 0;
            let tangTruong = (giaPhong*365*TDTangGia*(i-1)/100);

            if(i===1) congSuat = congSuat1;
            if(i > 1 && i <= 6) congSuat = congSuat2;
            if(i > 6) congSuat = congSuat3;

            doanhThuPhong = soPhong*(giaPhong*365 + tangTruong)*congSuat/100;
            tongDoanhThu += doanhThuPhong + doanhThuPhong*DTNhaHang/100;
            // doanh thu moi nam
            DTNam.push(doanhThuPhong*DTNhaHang/100 + doanhThuPhong);
            DTNamNhaHang.push(doanhThuPhong*DTNhaHang/100);
            TDTNam.push(tongDoanhThu);
            // doanh thu thanh phan 
            DT.congSuat.push(congSuat);
            DT.giaPhong.push(giaPhong+giaPhong*TDTangGia*(i-1)/100);
            DT.nhaHang = DTNamNhaHang;
            DT.phong.push(doanhThuPhong);
            DT.tongDoanhThu = TDTNam;
        }
        return {
            tongDoanhThu,
            arrTongDT: TDTNam,
            arrDT: DTNam,
            arrDTNH: DTNamNhaHang,
            DT
        };
    }
    function chiPhi(data, nam) {
        const luong = $('input[name="luong"]').val();
        const soLaoDong = $('input[name="soLaoDong"]').val();
        const TDTangLuong = $('input[name="tangLuong"]').val();
        const CPBHXH = $('input[name="BHXH"]').val();
        const CPDaoTao = $('input[name="daoTao"]').val();
        const CPDienNuoc = $('input[name="dienNuoc"]').val();
        const CPSuaChua = $('input[name="suaChua"]').val();
        let CPQuangCao = $('input[name="quangCao"]').val();
        const CPThueDat = $('input[name="thueDat"]').val();
        const CPQuanLy = $('input[name="quanLy"]').val();
        const CPPhongNgu = $('input[name="phongNgu"]').val();
        const CPNhaHang = $('input[name="hDNhaHang"]').val();
        let tongChiPhi = 0;
        let arrTongCP = [], arrCPNam = [];
        let CP = {
            luong: [],
            tongLuong: [],
            BHXH: [],
            daoTao: [], 
            dienNuoc: [], 
            suaChua: [], 
            quangCao: [], 
            quanLy: [],
            phongNgu: [],
            nhaHang: []
        }
        for(let i = 1 ; i <= nam; i++) {
            let chiPhi = 0;
            if(i > 5) CPQuangCao = 0;
            let cpChung = (parseInt(CPDaoTao) + parseInt(CPDienNuoc) + parseInt(CPSuaChua) + parseInt(CPQuangCao) + parseInt(CPQuanLy) + parseInt(CPPhongNgu))/100;
            chiPhi = (1 + CPBHXH/100 + (i-1)*TDTangLuong/100)*luong*12*soLaoDong + cpChung*data.arrDT[i-1] + parseInt(CPThueDat) + data.arrDTNH[i-1]*CPNhaHang/100;
            tongChiPhi += chiPhi;
            // chi phi moi nam
            arrCPNam.push(parseInt(chiPhi));
            // tong chi phi cac nam
            arrTongCP.push(parseInt(tongChiPhi));
            // chi phi tung thanh phan
            let TLuong = parseInt(luong) + luong*(i-1)*TDTangLuong/100;
            CP.luong.push(TLuong*12);
            CP.tongLuong.push(30*TLuong*12);
            CP.BHXH.push(TLuong*soLaoDong*CPBHXH/100);
            CP.daoTao.push(data.arrDT[i-1]*CPDaoTao/100);
            CP.dienNuoc.push(data.arrDT[i-1]*CPDienNuoc/100);
            CP.suaChua.push(data.arrDT[i-1]*CPSuaChua/100);
            CP.quangCao.push(data.arrDT[i-1]*CPQuangCao/100);
            CP.quanLy.push(data.arrDT[i-1]*CPQuanLy/100);
            CP.phongNgu.push(data.arrDT[i-1]*CPPhongNgu/100);
            CP.nhaHang.push(data.arrDTNH[i-1]*CPNhaHang/100);
        }
        return {
            arrTongCP,
            arrTongDT: data.arrTongDT,
            arrCPNam,
            CP,
            DT: data.DT
        }
    } 
})


