'use strict';

function HeaderDialog(dialog, onSave) {

        // Private Variables


        var that = this;                 // generic pointer back to this function
        var activeSysConfig;        // pointer to the current system configuration

        /** By default, all parameters are shown on the header
                however, specific firmware version parameters can be hidden
                by adding them to this variable
        **/

    var parameterVersion = [
        {name:'dterm_average_count'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'0.0.0', max:'2.6.9'},
        {name:'rc_smoothing'                 , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'0.0.0', max:'2.8.9'},
        {name:'dynamic_pterm'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.6.0', max:'2.7.9'},
        {name:'iterm_reset_offset'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.6.0', max:'2.7.9'},
        {name:'superExpoFactor'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.6.0', max:'2.7.9'},
        {name:'superExpoFactorYaw'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.7.0', max:'2.7.9'},
        {name:'superExpoYawMode'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.7.0', max:'2.7.9'},
        {name:'rollPitchItermResetRate'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.7.0', max:'2.7.9'},
        {name:'yawItermResetRate'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.7.0', max:'2.7.9'},
        {name:'dynamic_pid'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.8.0', max:'2.9.9'},
        {name:'rcYawRate'                    , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.8.0', max:'999.9.9'},
        {name:'airmode_activate_throttle'    , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.8.0', max:'999.9.9'},
        {name:'rollPitchItermIgnoreRate'     , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.8.0', max:'3.0.1'},
        {name:'yawItermIgnoreRate'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'2.8.0', max:'3.0.1'},
        {name:'gyro_notch_hz'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'gyro_notch_cutoff'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'dterm_lpf2_hz'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.4.0', max:'999.9.9'},
        {name:'dterm_notch_hz'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'dterm_notch_cutoff'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'rc_interpolation'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'4.2.999'},
        {name:'rc_interpolation_interval'    , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'4.2.999'},
        {name:'gyro_sync_denom'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'pid_process_denom'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'unsynced_fast_pwm'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'fast_pwm_protocol'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'motor_pwm_rate'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'serialrx_provider'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'dterm_filter_type'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'dterm_filter2_type'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'pidAtMinThrottle'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'itermThrottleGain'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'3.0.1'},
        {name:'ptermSRateWeight'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'3.0.0'},
        {name:'dtermSetpointWeight'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'3.4.0'},
        {name:'setpointRelaxRatio'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'3.4.0'},
        {name:'yawRateAccelLimit'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'rateAccelLimit'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'gyro_soft_type'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'gyro_soft2_type'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.4.0', max:'999.9.9'},
        {name:'gyro_lowpass2_hz'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.4.0', max:'999.9.9'},
        {name:'gyro_32khz_hardware_lpf'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.4.0', max:'3.9.9'},
        {name:'debug_mode'                   , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.0', max:'999.9.9'},
        {name:'gyro_notch_hz_2'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.1', max:'999.9.9'},
        {name:'gyro_notch_cutoff_2'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.0.1', max:'999.9.9'},
        {name:'pidController'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'0.0.0', max:'3.0.1'},
        {name:'motorOutputLow'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'motorOutputHigh'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'digitalIdleOffset'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'antiGravityGain'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'antiGravityThreshold'         , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'itermWindupPointPercent'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.1.0', max:'999.9.9'},
        {name:'pidSumLimit'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.3.0', max:'999.9.9'},
        {name:'pidSumLimitYaw'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.3.0', max:'999.9.9'},
        {name:'rc_smoothing_type'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.4.0', max:'4.2.999'},
        {name:'antiGravityMode'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.5.0', max:'999.9.9'},
        {name:'rc_smoothing_rx_average'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.5.0', max:'999.9.9'},
        {name:'rc_smoothing_debug_axis'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.5.0', max:'999.9.9'},
        {name:'abs_control_gain'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.0.0', max:'999.9.9'},
        {name:'use_integrated_yaw'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.0.0', max:'999.9.9'},
        {name:'rc_interpolation_channels'    , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.0.0', max:'4.2.999'},
        {name:'gyro_rpm_notch_harmonics'     , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'gyro_rpm_notch_q'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'gyro_rpm_notch_min'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'rpm_notch_lpf'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.2.0', max:'999.9.9'},
        {name:'dterm_rpm_notch_harmonics'    , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'4.2.999'},
        {name:'dterm_rpm_notch_q'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'4.2.999'},
        {name:'dterm_rpm_notch_min'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'4.2.999'},
        {name:'dshot_bidir'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'iterm_relax_type'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'iterm_relax_cutoff'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'dyn_notch_range'              , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'4.1.7'},
        {name:'dyn_notch_width_percent'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'4.2.999'},
        {name:'dyn_notch_q'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'dyn_notch_min_hz'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.1.0', max:'999.9.9'},
        {name:'dyn_notch_max_hz'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.2.0', max:'999.9.9'},
        {name:'rates_type'                   , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.2.0', max:'999.9.9'},
        {name:'fields_disabled_mask'         , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'gyro_to_use'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dynamic_idle_min_rpm'         , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'motor_poles'                  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'ff_transition'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'3.5.0', max:'999.9.9'},
        {name:'ff_averaging'                 , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'ff_smooth_factor'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'ff_jitter_factor'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'ff_boost'                     , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'ff_max_rate_limit'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_mode'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_feedforward_hz'  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_setpoint_hz'     , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_auto_factor_setpoint', type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_auto_factor_throttle', type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_active_cutoffs_ff',    type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_active_cutoffs_sp',    type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rc_smoothing_active_cutoffs_thr',   type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dyn_notch_count'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'rpm_filter_fade_range_hz'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dyn_idle_p_gain'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dyn_idle_i_gain'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dyn_idle_d_gain'               , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'dyn_idle_max_increase'         , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_pids_mode'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_pi_gain'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_i_gain'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_d_gain'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_dmax_gain'          , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_feedforward_gain'   , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_pitch_d_gain'       , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_pitch_pi_gain'      , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_master_multiplier'  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_dterm_filter'       , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_dterm_filter_multiplier' , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_gyro_filter'             , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'simplified_gyro_filter_multiplier'  , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'motor_output_limit'            , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'throttle_limit_type'           , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'throttle_limit_percent'        , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'throttle_boost'                , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
        {name:'throttle_boost_cutoff'         , type:FIRMWARE_TYPE_BETAFLIGHT,  min:'4.3.0', max:'999.9.9'},
    ];

    function ratesScaling(rates_type)
    {
        let rcRateFactor = 1
        let rcRateDec = 0
        let rcExpoFactor = 1
        let rcExpoDec = 2
        let ratesFactor = 1
        let ratesDec = 0
        switch(rates_type)
        {
            case 0: // NONE
                rcExpoDec = 0
                break
            case 1: // BETAFLIGHT
                rcRateFactor = 1
                rcRateDec = 2
                ratesFactor = 1
                ratesDec = 2
                break
            case 2: // RACEFLIGHT
                rcRateFactor = 10
                rcExpoDec = 0
                break
            case 3: // KISS
                rcRateFactor = 1
                rcRateDec = 2
                ratesFactor = 1
                ratesDec = 2
                break
            case 5: // QUICK
                ratesFactor = 10
                rcRateDec = 2
                break
            case 4: // ACTUAL
                rcRateFactor = 10
                ratesFactor = 10
                break
            default:
                break
        }
        return {rcRateFactor, rcRateDec, rcExpoFactor, rcExpoDec, ratesFactor, ratesDec}
    }

        function isParameterValid(name) {

                for(var i=0; i<parameterVersion.length; i++) {
                        if (parameterVersion[i].name == name && parameterVersion[i].type == activeSysConfig.firmwareType) {
                                return (semver.gte(activeSysConfig.firmwareVersion, parameterVersion[i].min) && semver.lte(activeSysConfig.firmwareVersion, parameterVersion[i].max));
                        }
                }
                return true; // default is to show parameter
        }

    function renderOptions(selected, index, list) {
        var
            option = $("<option></option>")
                .text(list[index])
                .attr("value", index);

        if (index == selected) {
            option.attr("selected", "selected");
        }

        return option;
    }

    function renderSelect(name, selected, list) {
            // Populate a select drop-down box
            var parameterElem = $('.parameter td[name="' + name + '"]');
            var selectElem = $('select', parameterElem);
                        selectElem.children().remove(); // clear list
                        for(var i=0; i<list.length; i++) {
                                selectElem.append(renderOptions(selected, i, list));
                        }
                        parameterElem.attr('title', 'set '+name+'='+list[selectElem.val()]);

                        parameterElem.css('display', isParameterValid(name)?('table-cell'):('none'));

                        if(selected!=null) {
                                parameterElem.removeClass('missing');
                        } else {
                                parameterElem.addClass('missing');
                        }

    }

    function setParameter(name, data, decimalPlaces) {
            var parameterElem = $('.parameter td[name="' + name + '"]');
                var nameElem = $('input', parameterElem);
                if(data!=null) {
                        nameElem.val((data/Math.pow(10,decimalPlaces)).toFixed(decimalPlaces));
                        nameElem.attr('decPl', decimalPlaces);
                        parameterElem.attr('title', 'set '+name+'='+data);
                        parameterElem.removeClass('missing');
                } else {
                        parameterElem.addClass('missing');
                }
                parameterElem.css('display', isParameterValid(name)?('table-cell'):('none'));

        }

    function setParameterFloat(name, data, decimalPlaces) {
        var parameterElem = $('.parameter td[name="' + name + '"]');
        var nameElem = $('input', parameterElem);
        if(data!=null) {
            nameElem.val(data.toFixed(decimalPlaces));
            nameElem.attr('decPl', decimalPlaces);
            parameterElem.attr('title', 'set '+name+'='+data);
            parameterElem.removeClass('missing');
        } else {
            parameterElem.addClass('missing');
        }
        parameterElem.css('display', isParameterValid(name)?('table-cell'):('none'));

    }


        function setCheckbox(name, data) {
            var parameterElem = $('.static-features td[name="' + name + '"]');
                var nameElem = $('input', parameterElem);
                if(data!=null) {
                        var state = (data == 1);
                        nameElem.prop('checked', state);
                        parameterElem.attr('title', 'set '+name+'='+data);
                        nameElem.closest('tr').removeClass('missing');
                } else {
                        nameElem.closest('tr').addClass('missing');
                }
                parameterElem.parent().css('display', isParameterValid(name)?('table-row'):('none'));
        }

        function populatePID(name, data) {
            const DECPL_MAP = { 0: 1, 1: 3, 2: 0, 3: 1 };
            var i = 0;
            var nameElem = $('.pid_tuning .' + name + ' input');
            nameElem.each(function () {
                $(this).attr('name', name + '[' + i + ']');
                if(data!=null) {
                    $(this).closest('tr').removeClass('missing');
                    if(data[i] == null) {
                        $(this).val('').addClass('missing');
                    } else {
                        $(this).val((data[i]).toFixed(0)).attr('decPl', DECPL_MAP[i] || 0).removeClass('missing');
                    }
                    i++;
                } else {
                    $(this).closest('tr').addClass('missing');
                }
            })
        }

        function isFeatureEnabled(name, list, value) {
                for (var i = 0; i < list.length; i++) {
                        if (list[i].name == name && (value & 1<<list[i].bit)) {
                                return true;
                        }
                }
                return false;
        }

        function builtFeaturesList(sysConfig) {

                var value = sysConfig.features;

        // generate features
        var features = [
                {bit:  3, group: 'rxMode', mode: 'group', name: 'RX_SERIAL', description: 'Serial Receiver Selected'},
                {bit:  0, group: 'rxMode', mode: 'group', name: 'RX_PPM', description: 'PPM Receiver Selected'},
                {bit: 14, group: 'rxMode', mode: 'group', name: 'RX_MSP', description: 'Controller over MSP'},
                {bit: 13, group: 'rxMode', mode: 'group', name: 'RX_PARALLEL_PWM', description: 'PWM receiver selected'},

                {bit:  6, group: 'other', name: 'SOFTSERIAL', description: 'CPU based serial port'},
                {bit:  7, group: 'other', name: 'GPS', description: 'GPS device connected'},
                {bit: 10, group: 'other', name: 'TELEMETRY', description: 'Telemetry Output'},
                {bit: 16, group: 'other', name: 'LED_STRIP', description: 'RGB LED strip support'},
                {bit: 18, group: 'other', name: 'OSD', description: 'On Screen Display'},
                {bit: 19, group: 'other', name: 'CMS', description: 'Configuration Menu System'},
                {bit: 27, group: 'other', name: 'ESC_SENSOR', description: 'Use ESC telemetry as sensor'},
                {bit: 28, group: 'other', name: 'FREQ_SENSOR', description: 'Frequency Sensor'},
                {bit: 29, group: 'other', name: 'DYN_NOTCH', description: 'Dynamic gyro notch filtering'},
                {bit: 30, group: 'other', name: 'RPM_FILTER', description: 'RPM Filtering'},
        ];

        var radioGroups = [];

        var features_e = $('.features');
        features_e.children().remove(); // clear list

        for (var i = 0; i < features.length; i++) {
            var row_e;

            var feature_tip_html = '';

            if (features[i].mode === 'group') {
                row_e = $('<tr><td><input class="feature" id="feature-'
                        + i
                        + '" value="'
                        + features[i].bit
                        + '" title="feature ' + ((value & 1<<features[i].bit)?'':'-')
                        + features[i].name
                        + '" type="radio" name="'
                        + features[i].group
                        + '" bit="' + i + '" /></td><td><label for="feature-'
                        + i
                        + '">'
                        + features[i].name
                        + '</label></td><td><span>' + features[i].description + '</span>'
                        + feature_tip_html + '</td></tr>');
                radioGroups.push(features[i].group);
            } else {
                row_e = $('<tr><td><label class="option"><input class="feature '
                        + i
                        + ' ios-switch" name="'
                        + features[i].name
                        + '" title="feature ' + ((value & 1<<features[i].bit)?'':'-')
                        + features[i].name
                        + '" type="checkbox" bit="'+ i +'" /><div><div></div></div></label></td><td><label for="feature-'
                        + i
                        + '">'
                        + features[i].name
                        + '</label></td><td><span>' + features[i].description + '</span>'
                        + feature_tip_html + '</td></tr>');

                var feature_e = row_e.find('input.feature');

                feature_e.prop('checked', (value & 1<<features[i].bit));
                feature_e.data('bit', features[i].bit);
            }

                        features_e.each(function () {
                                if ($(this).hasClass(features[i].group)) {
                                        $(this).append(row_e);
                                }
                        });
                }

                for (var i = 0; i < radioGroups.length; i++) {
                        var group = radioGroups[i];
                        var controls_e = $('input[name="' + group + '"].feature');

                        controls_e.each(function() {
                                var bit = parseInt($(this).attr('value'));
                                var state = (value & 1<<bit);

                                $(this).prop('checked', state);
                        });
                }

                // Finally, if the features value is not part of the log, then invalidate all the check/radio boxes
                (value!=null)?$(".feature").closest('tr').removeClass('missing'):
                                          $(".feature").closest('tr').addClass('missing');

        }

    function builtSelectedFieldsList(sysConfig) {

        const value = sysConfig.fields_mask;

        // generate features
        let fields = [
            {name: 'RC Command', description: 'Three axis RC Commands'},
            {name: 'Setpoint', description: 'Three axis Setpoints'},
            {name: 'Mixer', description: 'Three axis Mixer inputs'},
            {name: 'PID', description: 'Three axis PID terms'},
            {name: 'Attitude', description: 'Three axis attitude'},
            {name: 'Raw Gyro', description: 'Raw Gyro data'},
            {name: 'Gyro', description: 'Gyro data'},
            {name: 'Accelerometer', description: 'Accelerometer data'},
            {name: 'Magnetometer', description: 'Three axis Compass'},
            {name: 'Altimeter', description: 'Altitude and Variometer'},
            {name: 'Battery', description: 'Battery voltage and current'},
            {name: 'RSSI', description: 'Receiver Signal Quality'},
            {name: 'GPS', description: 'All GPS-related values'},
            {name: 'RPM', description: 'Rotor Speeds'},
            {name: 'Motors', description: 'Motor throttle values'},
            {name: 'Servos', description: 'Servo positions'},
            {name: 'VBEC', description: 'BEC Voltage'},
            {name: 'VBUS', description: '+5V Voltage'},
            {name: 'Temperatures', description: 'Temperatures'},
        ];

        if(sysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT && semver.gte(sysConfig.firmwareVersion, '4.4.0')) {
            fields = [...fields, ...[
                {name: 'ESC', description: 'ESC Telemetry'},
                {name: 'BEC', description: 'BEC Telemetry'},
                {name: 'ESC2', description: 'ESC2 Telemetry'},
            ]]
        }

        const fieldsList_e = $('tbody.fields_list').empty()

        for (let i = 0; i < fields.length; i++) {
            const row_e = $(`<tr><td><label class="option"><input class="field ${i}
                          ios-switch" name="${fields[i].name}
                          " title="field ${((value & 1<<i)?'':'-')} ${fields[i].name}
                          " type="checkbox" /><div><div></div></div></label></td><td><label for="field-
                          ${i}">${fields[i].name}</label></td><td><span>
                          ${fields[i].description}</span></td></tr>`);

            const field_e = row_e.find('input.field');

            field_e.prop('checked', (value & 1<<i));
            field_e.data('bit', i);

            fieldsList_e.append(row_e)
        }
    }

        function renderUnknownHeaders(unknownHeaders) {
                // Build a table of unknown header entries
                try {
                        if(unknownHeaders!=0) {
                                var table = $('.unknown table');
                                var elem = '';
                                $("tr:not(:first)", table).remove(); // clear the entries (not the first row which has the title bar)

                                for(var i=0; i<unknownHeaders.length; i++) {
                                        elem += '<tr><td>' + unknownHeaders[i].name + '</td>' +
                                                                '<td>' + unknownHeaders[i].value + '</td></tr>';
                                }

                                table.append(elem);
                                $('.unknown').show();
                        } else {
                                $('.unknown').hide();
                        }
                } catch(e) {
                        $('.unknown').hide();
                }
        }

    function harmonicLabel(num) {
        switch(num) {
            case 0: return 'None'
            case 1: return 'Fundamental'
            case 2: return '2nd'
            case 3: return '3rd'
            default:
                return num + 'th'
        }
    }

    function getGyroRpmNotchPresetText(value) {
        return ['Custom', 'Low', 'Medium', 'High'][value] ?? value;
    }

    function renderRPMNotches(gyro_rpm_notch_preset,
        gyro_rpm_notch_min_hz,
        gyro_rpm_notch_source_pitch,
        gyro_rpm_notch_q_pitch,
        gyro_rpm_notch_source_roll,
        gyro_rpm_notch_q_roll,
        gyro_rpm_notch_source_yaw,
        gyro_rpm_notch_q_yaw) {

        var $tableNc = $('.rpm_notch_config table tbody').empty()
        let elemNc = `<tr><td>Gyro Rpm Notch Preset</td><td>${getGyroRpmNotchPresetText(gyro_rpm_notch_preset)}</td></tr>`;
        elemNc += `<tr><td>Gyro Rpm Notch Min Hz</td><td>${gyro_rpm_notch_min_hz}</td></tr>`;
        $tableNc.append(elemNc);

        //Create pitch data
        const pitchItems = createNotchData(gyro_rpm_notch_source_pitch,gyro_rpm_notch_q_pitch)
        //Create roll data
        const rollItems = createNotchData(gyro_rpm_notch_source_roll,gyro_rpm_notch_q_roll)
        //Create yaw data
        const yawItems = createNotchData(gyro_rpm_notch_source_yaw,gyro_rpm_notch_q_yaw)


        var $table = $('.rpm_notches table tbody').empty()
        let elem = ""
        for (const [src, item] of Object.entries(pitchItems)) {
            elem += `<tr><td>Pitch</td><td>${item.source}</td><td>${item.type}</td><td>${item.harmonic}</td><td>${item.q}</td></tr>`
        }
        for (const [src, item] of Object.entries(rollItems)) {
            elem += `<tr><td>Roll</td><td>${item.source}</td><td>${item.type}</td><td>${item.harmonic}</td><td>${item.q}</td></tr>`
        }
        for (const [src, item] of Object.entries(yawItems)) {
            elem += `<tr><td>Yaw</td><td>${item.source}</td><td>${item.type}</td><td>${item.harmonic}</td><td>${item.q}</td></tr>`
        }


        $table.append(elem);
    }

   function createNotchData(source,q) {

    const items = (source || []).reduce(function(acc, src, i) {
        if(src == 0) return acc
        if(!acc[src]) {
            acc[src] = {type: "Single", hCount: 1}
        } else if (acc[src].hCount == 1) {
            acc[src].type = "Double";
            acc[src].hCount = 2;
        } else{
            acc[src].type = "Triple";
        }

        if(src >= 1 && src <= 8) {
            acc[src].source = "Motor " + src
            acc[src].harmonic = harmonicLabel(1)
        } else if(src == 10) {
            acc[src].source = "Main Motor"
            acc[src].harmonic = harmonicLabel(1)
        } else if(src >= 11 && src <= 18) {
            acc[src].source = "Main Rotor"
            acc[src].harmonic = harmonicLabel(src % 10)
        } else if(src == 20) {
            acc[src].source = "Tail Motor"
            acc[src].harmonic = harmonicLabel(1)
        } else if(src >= 21 && src <= 28) {
            acc[src].source = "Tail Rotor"
            acc[src].harmonic = harmonicLabel(src % 10)
        } else {
            acc[src].source = "Unknown"
            acc[src].harmonic = harmonicLabel(0)
        }
        acc[src].q = (q[i] * 0.1).toFixed(1)
        return acc
    }, {})

    return items

   }

    function renderRpmFilters(sources, qs, limits) {
        const items = (sources || []).reduce(function(acc, src, i) {
            if(src == 0) return acc
            if(!acc[src]) {
                acc[src] = {type: "Single"}
            } else {
                acc[src].type = "Double"
            }

            if(src >= 1 && src <= 8) {
                acc[src].source = "Motor " + src
                acc[src].harmonic = harmonicLabel(1)
            } else if(src == 10) {
                acc[src].source = "Main Motor"
                acc[src].harmonic = harmonicLabel(1)
            } else if(src >= 11 && src <= 18) {
                acc[src].source = "Main Rotor"
                acc[src].harmonic = harmonicLabel(src % 10)
            } else if(src == 20) {
                acc[src].source = "Tail Motor"
                acc[src].harmonic = harmonicLabel(1)
            } else if(src >= 21 && src <= 28) {
                acc[src].source = "Tail Rotor"
                acc[src].harmonic = harmonicLabel(src % 10)
            } else {
                acc[src].source = "Unknown"
                acc[src].harmonic = harmonicLabel(0)
            }
            acc[src].q = (qs[i] * 0.1).toFixed(1)
            acc[src].limit = limits[i]
            return acc
        }, {})

        var $table = $('.rpm_filters table tbody').empty()
        let elem = ""
        for (const [src, item] of Object.entries(items)) {
            elem += `<tr><td>${item.source}</td><td>${item.type}</td><td>${item.harmonic}</td><td>${item.q}</td><td>${item.limit}</td></tr>`
        }
        $table.append(elem);
    }

    function applyLocalTimezoneOffset(date) {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60_000);
    }

    function formatLogStartTimestamp(value) {
        try {
            const d = applyLocalTimezoneOffset(new Date(value));
            if (Number(d) < 0) {
                return "Unknown";
            }

            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
                .format(d)
                .replace(",", "");
        } catch {
            return "Invalid";
        }
    }

    function renderSysConfig(sysConfig) {

      activeSysConfig = sysConfig; // Store the current system configuration

      // Update the log header

      $('h5.modal-title-revision').text((sysConfig['Firmware revision'] != null) ? ` Rev : ${sysConfig['Firmware revision']}` : '');
      $('h5.modal-title-board-info').text((sysConfig['Board information'] != null) ? ` Board : ${sysConfig['Board information']}` : '');
      $('h5.modal-title-date').text((sysConfig['Firmware date'] != null) ? ` Date : ${sysConfig['Firmware date']}` : '');
      $('h5.modal-title-craft').text((sysConfig['Craft name'] != null) ? ` Name : ${sysConfig['Craft name']}` : '');
      $('h5.modal-title-date-time').text(` Log Start : ${formatLogStartTimestamp(sysConfig['Log start datetime'])}`);

                switch(sysConfig.firmwareType) {
                        case FIRMWARE_TYPE_ROTORFLIGHT:
                        case FIRMWARE_TYPE_BETAFLIGHT:
                        case FIRMWARE_TYPE_CLEANFLIGHT:
                                $('.header-dialog-toggle').hide(); // selection button is not required
                                        break;
                        case FIRMWARE_TYPE_INAV:
                                $('[name="rates[0]"] input').attr("step", "10").attr("min", "10").attr("max", "1800");
                                $('.header-dialog-toggle').hide(); // selection button is not required
                                        break;
                        default:
                                $('.header-dialog-toggle').text('Cleanflight');

                                // Toggle Button
                                $('.header-dialog-toggle').show(); // Selection button is required
                                $('.header-dialog-toggle').click( function() {
                                        if($('html').hasClass('isCF')) {
                                                $('html').addClass('isBF');
                                                $('html').removeClass('isCF');
                                                $('.header-dialog-toggle').text('Betaflight');
                                        } else {
                                                $('html').removeClass('isBF');
                                                $('html').addClass('isCF');
                                                $('.header-dialog-toggle').text('Cleanflight');
                                        }
                                });
                }

                if((sysConfig.firmware >= 3.0 && sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT) ||
                   (sysConfig.firmware >= 2.0 && sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT)) {

                        PID_CONTROLLER_TYPE = ([
                                        'LEGACY',
                                        'BETAFLIGHT'
                                ])
                } else if (sysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT) {
                        PID_CONTROLLER_TYPE = ([
                                        'ROTORFLIGHT',
                                ])
                } else {
                        PID_CONTROLLER_TYPE = ([
                                        'UNUSED',
                                        'MWREWRITE',
                                        'LUXFLOAT'
                                ])
                }

            renderSelect("pidController", sysConfig.pidController, PID_CONTROLLER_TYPE);

        if(activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '4.0.0')) {
            $('.parameter td[name="pidController"]').css('display', 'none');
        }


        // Populate the ROLL Pid Faceplate
        populatePID('rollPID'                                        , sysConfig.rollPID);
        populatePID('pitchPID'                                        , sysConfig.pitchPID);
        populatePID('yawPID'                                        , sysConfig.yawPID);
        populatePID('govPID'                                        , sysConfig.govPID);

        // Removed since GPS Rescue
        if (semver.lt(sysConfig.firmwareVersion, "3.4.0")) {
            populatePID('altPID'                , sysConfig.altPID);
            populatePID('velPID'                , sysConfig.velPID);
            populatePID('magPID'                , sysConfig.magPID); // this is not an array
            populatePID('posPID'                , sysConfig.posPID);
            populatePID('posrPID'               , sysConfig.posrPID);
            populatePID('navrPID'               , sysConfig.navrPID);
        } else {
            $('#pid_baro').hide();
            $('#pid_baro_header').hide();
            $('#pid_mag').hide();
            $('#pid_mag_header').hide();
            $('#pid_gps').hide();
            $('#pid_gps_header').hide();
        }

        populatePID('levelPID'                  , sysConfig.levelPID);
        populatePID('rollBW'                    , sysConfig.rollBW);
        populatePID('pitchBW'                   , sysConfig.pitchBW);
        populatePID('yawBW'                     , sysConfig.yawBW);

        // Fill in data from for the rates object
        const {rcRateFactor, rcRateDec, rcExpoFactor, rcExpoDec, ratesFactor, ratesDec} = ratesScaling(sysConfig.rates_type)
        setParameter('rcRollRate'               , sysConfig.rc_rates[0] * rcRateFactor, rcRateDec);
        setParameter('rcPitchRate'              , sysConfig.rc_rates[1] * rcRateFactor, rcRateDec);
        setParameter('rcYawRate'                , sysConfig.rc_rates[2] * rcRateFactor, rcRateDec);
        setParameter('rcRollExpo'               , sysConfig.rc_expo[0] * rcExpoFactor, rcExpoDec);
        setParameter('rcPitchExpo'              , sysConfig.rc_expo[1] * rcExpoFactor, rcExpoDec);
        setParameter('rcYawExpo'                , sysConfig.rc_expo[2] * rcExpoFactor, rcExpoDec);
        setParameter('rates[0]'                 , sysConfig.rates[0] * ratesFactor, ratesDec);
        setParameter('rates[1]'                 , sysConfig.rates[1] * ratesFactor, ratesDec);
        setParameter('rates[2]'                 , sysConfig.rates[2] * ratesFactor, ratesDec);

        renderRPMNotches(sysConfig.gyro_rpm_notch_preset,
            sysConfig.gyro_rpm_notch_min_hz,
            sysConfig.gyro_rpm_notch_source_pitch,
            sysConfig.gyro_rpm_notch_q_pitch,
            sysConfig.gyro_rpm_notch_source_roll,
            sysConfig.gyro_rpm_notch_q_roll,
            sysConfig.gyro_rpm_notch_source_yaw,
            sysConfig.gyro_rpm_notch_q_yaw );

        renderRpmFilters(sysConfig.gyro_rpm_filter_bank_rpm_source, sysConfig.gyro_rpm_filter_bank_notch_q, sysConfig.gyro_rpm_filter_bank_rpm_limit)

        setParameter('vbatscale'                                ,sysConfig.vbatscale,0);
        setParameter('vbatref'                                        ,sysConfig.vbatref,2);
        setParameter('vbatmincellvoltage'                ,sysConfig.vbatmincellvoltage,2);
        setParameter('vbatmaxcellvoltage'                ,sysConfig.vbatmaxcellvoltage,2);
        setParameter('vbatwarningcellvoltage'        ,sysConfig.vbatwarningcellvoltage,2);
        setParameter('minthrottle'                                ,sysConfig.minthrottle,0);
        setParameter('maxthrottle'                                ,sysConfig.maxthrottle,0);
        setParameter('currentMeterOffset'                ,sysConfig.currentMeterOffset,0);
        setParameter('currentMeterScale'                ,sysConfig.currentMeterScale,0);
        setParameter('thrMid'                                        ,sysConfig.thrMid,2);
        setParameter('thrExpo'                                        ,sysConfig.thrExpo,2);
        setParameter('dynThrPID'                                ,sysConfig.dynThrPID,2);
        setParameter('tpa-breakpoint'                        ,sysConfig.tpa_breakpoint,0);
        setParameter('superExpoFactor'                        ,sysConfig.superExpoFactor,2);
        setParameter('superExpoFactorYaw'                ,sysConfig.superExpoFactorYaw,2);

        setParameter('loopTime'                                        ,sysConfig.looptime,0);
        setParameter('gyro_sync_denom'                        ,sysConfig.gyro_sync_denom,0);
        setParameter('pid_process_denom'                ,sysConfig.pid_process_denom,0);
        setParameter('yaw_p_limit'                                ,sysConfig.yaw_p_limit,0);
        setParameter('dterm_average_count'                ,sysConfig.dterm_average_count,0);
        renderSelect('dynamic_pterm'                        ,sysConfig.dynamic_pterm, OFF_ON);
        setParameter('rollPitchItermResetRate'        ,sysConfig.rollPitchItermResetRate,0);
        setParameter('yawItermResetRate'                ,sysConfig.yawItermResetRate,0);
        setParameter('rollPitchItermIgnoreRate'        ,sysConfig.rollPitchItermIgnoreRate,0);
        setParameter('yawItermIgnoreRate'                ,sysConfig.yawItermIgnoreRate,0);
        setParameter('itermWindupPointPercent'  ,sysConfig.itermWindupPointPercent,0);
        setParameter('dterm_cut_hz'                                ,sysConfig.dterm_cut_hz,2);
        setParameter('iterm_reset_offset'                ,sysConfig.iterm_reset_offset,0);
        setParameter('deadband'                                        ,sysConfig.deadband,0);
        setParameter('yaw_deadband'                                ,sysConfig.yaw_deadband,0);

        if ((activeSysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT) ||
            (activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '3.4.0'))) {
            renderSelect('gyro_hardware_lpf'       ,sysConfig.gyro_lpf, GYRO_HARDWARE_LPF);

        } else {
            renderSelect('gyro_hardware_lpf'       ,sysConfig.gyro_lpf, GYRO_LPF);
        }

        setParameter('filter_process_denom', sysConfig.filter_process_denom, 0);
        setParameter('acc_lpf_hz'                                ,sysConfig.acc_lpf_hz,2);
        setParameter('acc_cut_hz'                                ,sysConfig.acc_cut_hz,2);
            setParameter('airmode_activate_throttle',sysConfig.airmode_activate_throttle, 0);
            renderSelect('serialrx_provider'                ,sysConfig.serialrx_provider, SERIALRX_PROVIDER);
            renderSelect('superExpoYawMode'                    ,sysConfig.superExpoYawMode, SUPER_EXPO_YAW);
            renderSelect('dynamic_pid'                                ,sysConfig.dynamic_pid, OFF_ON);

                if(isParameterValid('gyro_notch_hz_2')) {
                        setParameter('gyro_notch_hz'                        ,sysConfig.gyro_notch_hz[0],0);
                        setParameter('gyro_notch_cutoff'                ,sysConfig.gyro_notch_cutoff[0],0);
                        setParameter('gyro_notch_hz_2'                        ,sysConfig.gyro_notch_hz[1],0);
                        setParameter('gyro_notch_cutoff_2'                ,sysConfig.gyro_notch_cutoff[1],0);
                } else {
                        setParameter('gyro_notch_hz'                        ,sysConfig.gyro_notch_hz, 0);
                        setParameter('gyro_notch_cutoff'                ,sysConfig.gyro_notch_cutoff, 0);
                        setParameter('gyro_notch_hz_2'                        ,0,0); // this parameter does not exist in earlier versions
                        setParameter('gyro_notch_cutoff_2'                ,0,0); // this parameter does not exist in earlier versions
                }
                setParameter('dterm_notch_hz'                        ,sysConfig.dterm_notch_hz,0);
                setParameter('dterm_notch_cutoff'                ,sysConfig.dterm_notch_cutoff,0);
        setParameter('dterm_lpf2_hz'            ,sysConfig.dterm_lpf2_hz,0);
                setParameter('dterm_lpf_hz'                                ,sysConfig.dterm_lpf_hz,0);
                setParameter('yaw_lpf_hz'                                ,sysConfig.yaw_lpf_hz,0);
                setParameter('gyro_lowpass_hz'                        ,sysConfig.gyro_lowpass_hz,0);
                setParameter('gyro_lowpass2_hz'         ,sysConfig.gyro_lowpass2_hz,0);

        if ((activeSysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT) ||
            (activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '4.3.0'))) {
            setParameter('dynNotchCount'           ,sysConfig.dyn_notch_count        , 0);
        } else {
            setParameter('dynNotchCount'           ,sysConfig.dyn_notch_width_percent, 0);
        }
        setParameter('dynNotchQ'                   ,sysConfig.dyn_notch_q            , 1);
        setParameter('dynNotchMinHz'               ,sysConfig.dyn_notch_min_hz       , 0);
        setParameter('dynNotchMaxHz'               ,sysConfig.dyn_notch_max_hz       , 0);

        setParameter('gyro_rpm_notch_harmonics', sysConfig.gyro_rpm_notch_harmonics  , 0);
        setParameter('gyro_rpm_notch_q'        , sysConfig.gyro_rpm_notch_q          , 0);
        setParameter('gyro_rpm_notch_min'      , sysConfig.gyro_rpm_notch_min        , 0);
        setParameter('rpm_filter_fade_range_hz', sysConfig.rpm_filter_fade_range_hz  , 0);
        setParameter('rpm_notch_lpf'           , sysConfig.rpm_notch_lpf             , 0);

        setParameter('dterm_rpm_notch_harmonics', sysConfig.dterm_rpm_notch_harmonics, 0);
        setParameter('dterm_rpm_notch_q'        , sysConfig.dterm_rpm_notch_q        , 0);
        setParameter('dterm_rpm_notch_min'      , sysConfig.dterm_rpm_notch_min      , 0);

        $('.dshot_bidir_required').toggle(sysConfig.dshot_bidir == 1);

        setParameter('rcSmoothingRxAverage'         ,sysConfig.rc_smoothing_rx_average, 3);
        renderSelect('rcSmoothingDebugAxis'         ,sysConfig.rc_smoothing_debug_axis, RC_SMOOTHING_DEBUG_AXIS);

        if (activeSysConfig.firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '4.3.0')) {
            renderSelect('rcSmoothingMode'              ,sysConfig.rc_smoothing_mode, RC_SMOOTHING_MODE);
            setParameter('rcSmoothingFeedforwardHz'     ,sysConfig.rc_smoothing_feedforward_hz, 0);
            setParameter('rcSmoothingSetpointHz'        ,sysConfig.rc_smoothing_setpoint_hz, 0);
            setParameter('rcSmoothingAutoFactorSetpoint',sysConfig.rc_smoothing_auto_factor_setpoint, 0)
            setParameter('rcSmoothingThrottleHz'        ,sysConfig.rc_smoothing_throttle_hz, 0);
            setParameter('rcSmoothingAutoFactorThrottle',sysConfig.rc_smoothing_auto_factor_throttle, 0);
            setParameter('rcSmoothingActiveCutoffsFf'   ,sysConfig.rc_smoothing_active_cutoffs_ff_sp_thr[0], 0);
            setParameter('rcSmoothingActiveCutoffsSp'   ,sysConfig.rc_smoothing_active_cutoffs_ff_sp_thr[1], 0);
            setParameter('rcSmoothingActiveCutoffsThr'  ,sysConfig.rc_smoothing_active_cutoffs_ff_sp_thr[2], 0);
        } else if (activeSysConfig.firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '3.4.0')) {
            renderSelect('rcSmoothingMode'              ,sysConfig.rc_smoothing_mode, RC_SMOOTHING_TYPE);
            setParameter('rcSmoothingFeedforwardHz'     ,sysConfig.rc_smoothing_cutoffs[0], 0);
            setParameter('rcSmoothingSetpointHz'        ,sysConfig.rc_smoothing_cutoffs[1], 0);
            setParameter('rcSmoothingAutoFactorSetpoint',sysConfig.rc_smoothing_auto_factor_setpoint, 0);
            setParameter('rcSmoothingThrottleHz'        ,sysConfig.rc_smoothing_cutoffs[1], 0);
            setParameter('rcSmoothingAutoFactorThrottle',sysConfig.rc_smoothing_auto_factor_setpoint, 0);
            setParameter('rcSmoothingActiveCutoffsFf'   ,sysConfig.rc_smoothing_active_cutoffs[0], 0);
            setParameter('rcSmoothingActiveCutoffsSp'   ,sysConfig.rc_smoothing_active_cutoffs[1], 0);
            setParameter('rcSmoothingActiveCutoffsThr'  ,sysConfig.rc_smoothing_active_cutoffs[1], 0);
        } else {
            renderSelect('rcSmoothingMode'              ,"0", 0);
            setParameter('rcSmoothingFeedforwardHz'     ,"0", 0);
            setParameter('rcSmoothingSetpointHz'        ,"0", 0);
            setParameter('rcSmoothingAutoFactorSetpoint',"0", 0);
            setParameter('rcSmoothingThrottleHz'        ,"0", 0);
            setParameter('rcSmoothingAutoFactorThrottle',"0", 0);
            setParameter('rcSmoothingActiveCutoffsFf'   ,"0", 0);
            setParameter('rcSmoothingActiveCutoffsSp'   ,"0", 0);
            setParameter('rcSmoothingActiveCutoffsThr'  ,"0", 0);
        }

        // D_MIN
        if (activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '4.0.0')) {
            setParameter('d_min_roll'   , sysConfig.d_min[0]     , 0);
            setParameter('d_min_pitch'  , sysConfig.d_min[1]     , 0);
            setParameter('d_min_yaw'    , sysConfig.d_min[2]     , 0);
            setParameter('d_min_gain'   , sysConfig.d_min_gain   , 0);
            setParameter('d_min_advance', sysConfig.d_min_advance, 0);
            $("#d_min").show();
        } else {
            $("#d_min").hide();
        }

        // rate_limits
        if ((activeSysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT) ||
            (activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '4.0.0'))) {
            setParameter('rate_limits_roll'  , sysConfig.rate_limits[0], 0);
            setParameter('rate_limits_pitch' , sysConfig.rate_limits[1], 0);
            setParameter('rate_limits_yaw'   , sysConfig.rate_limits[2], 0);
            $("#rate_limits").show();
        } else {
            $("#rate_limits").hide();
        }

        renderSelect('iterm_relax_type', sysConfig.iterm_relax_type, ITERM_RELAX_TYPE);
        setParameter('iterm_relax_r'   , sysConfig.iterm_relax_cutoff[0], 0);
        setParameter('iterm_relax_p'   , sysConfig.iterm_relax_cutoff[1], 0);
        setParameter('iterm_relax_y'   , sysConfig.iterm_relax_cutoff[2], 0);
        setParameter('error_limit_r'   , sysConfig.error_limit[0], 0);
        setParameter('error_limit_p'   , sysConfig.error_limit[1], 0);
        setParameter('error_limit_y'   , sysConfig.error_limit[2], 0);
        setParameter('hsi_gain_r'      , sysConfig.hsi_gain[0], 0);
        setParameter('hsi_gain_p'      , sysConfig.hsi_gain[1], 0);
        setParameter('hsi_limit_r'     , sysConfig.hsi_limit[0], 0);
        setParameter('hsi_limit_p'     , sysConfig.hsi_limit[1], 0);

        setParameter('yaw_stop_gain_cw'          , sysConfig.yaw_stop_gain[0], 0);
        setParameter('yaw_stop_gain_ccw'         , sysConfig.yaw_stop_gain[1], 0);
        setParameter('yaw_precomp_cutoff'        , sysConfig.yaw_precomp[0], 0);
        setParameter('yaw_precomp_cyclic'        , sysConfig.yaw_precomp[1], 0);
        setParameter('yaw_precomp_collective'    , sysConfig.yaw_precomp[2], 0);
        setParameter('yaw_precomp_impulse_gain'  , sysConfig.yaw_precomp_impulse[0], 0);
        setParameter('yaw_precomp_impulse_decay' , sysConfig.yaw_precomp_impulse[1], 0);
        setParameter('yaw_inertia_precomp_gain'  , sysConfig.yaw_inertia_precomp[0], 0);
        setParameter('yaw_inertia_precomp_cutoff' , sysConfig.yaw_inertia_precomp[1], 1);
        setParameter('yaw_tta_gain'              , sysConfig.yaw_tta[0], 0);
        setParameter('yaw_tta_limit'             , sysConfig.yaw_tta[1], 0);

        setParameter('pitch_compensation'         , sysConfig.pitch_compensation, 0);
        setParameter('cyclic_coupling_gain'       , sysConfig.cyclic_coupling[0], 0);
        setParameter('cyclic_coupling_ratio'      , sysConfig.cyclic_coupling[1], 0);
        setParameter('cyclic_coupling_cutoff'     , sysConfig.cyclic_coupling[2], 1);

        setParameter('error_decay_time'           , sysConfig.error_decay[0], 1);
        setParameter('error_decay_rate_max'       , sysConfig.error_decay[1], 0);
        setParameter('error_decay_ground'         , sysConfig.error_decay_ground, 1);

        renderSelect('unsynced_fast_pwm'                ,sysConfig.unsynced_fast_pwm, MOTOR_SYNC);
        renderSelect('fast_pwm_protocol'                ,sysConfig.fast_pwm_protocol, FAST_PROTOCOL);
        setParameter('motor_pwm_rate'                    ,sysConfig.motor_pwm_rate,0);
        renderSelect('dshot_bidir'              ,sysConfig.dshot_bidir, OFF_ON);

        renderSelect('dterm_filter_type'                ,sysConfig.dterm_filter_type, FILTER_TYPE);
        renderSelect('dterm_filter2_type'                ,sysConfig.dterm_filter2_type, FILTER_TYPE);
        setParameter('ptermSRateWeight'                        ,sysConfig.ptermSRateWeight,2);
        setParameter('dtermSetpointWeight'                ,sysConfig.dtermSetpointWeight,2);

        if(activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '4.3.0')) {
            renderSelect('feedforwardAveraging'  ,sysConfig.ff_averaging, FF_AVERAGING);
            setParameter('feedforwardSmoothing'  ,sysConfig.ff_smooth_factor,0);
            setParameter('feedforwardJitter'     ,sysConfig.ff_jitter_factor,0);
            setParameter('feedforwardMaxRate'    ,sysConfig.ff_max_rate_limit,0);
        } else {
            setParameter('feedforwardAveraging'  ,"0",0);
            setParameter('feedforwardSmoothing'  ,"0",0);
            setParameter('feedforwardJitter'     ,"0",0);
            setParameter('feedforwardMaxRate'    ,"0",0);
        }
        setParameter('feedforwardTransition'            ,sysConfig.ff_transition,2);
        setParameter('feedforwardBoost'         ,sysConfig.ff_boost,0);

        setParameter('abs_control_gain'         ,sysConfig.abs_control_gain, 0);

        setParameter('rcRollResponseTime'       , sysConfig.response_time[0], 0);
        setParameter('rcPitchResponseTime'      , sysConfig.response_time[1], 0);
        setParameter('rcYawResponseTime'        , sysConfig.response_time[2], 0);
        setParameter('rcRollAccelLimit'         , sysConfig.accel_limit[0] * 10, 0);
        setParameter('rcPitchAccelLimit'        , sysConfig.accel_limit[1] * 10, 0);
        setParameter('rcYawAccelLimit'          , sysConfig.accel_limit[2] * 10, 0);

        renderSelect('gyro_soft_type'                        ,sysConfig.gyro_soft_type, FILTER_TYPE);
        renderSelect('gyro_soft2_type'          ,sysConfig.gyro_soft2_type, FILTER_TYPE);
        renderSelect('debug_mode'                                ,sysConfig.debug_mode, DEBUG_MODE);
        setParameter('debug_axis'                                ,sysConfig.debug_axis,0);
                setParameter('motorOutputLow'                        ,sysConfig.motorOutput[0],0);
                setParameter('motorOutputHigh'                        ,sysConfig.motorOutput[1],0);
                setParameter('digitalIdleOffset'                ,sysConfig.digitalIdleOffset,2);
        renderSelect('antiGravityMode'          ,sysConfig.anti_gravity_mode, ANTI_GRAVITY_MODE);
        if((activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '3.1.0')) ||
                (activeSysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '2.0.0'))) {
            setParameter('antiGravityGain'      ,sysConfig.anti_gravity_gain,3);
        } else {
            setParameter('antiGravityGain'      ,sysConfig.anti_gravity_gain,0);
        }
        setParameter('antiGravityThreshold'     ,sysConfig.anti_gravity_threshold,0);
        if (sysConfig.anti_gravity_mode === ANTI_GRAVITY_MODE.indexOf('SMOOTH')) {
            $('.parameter td[name="antiGravityThreshold"]').css('display', 'none');
        }
                setParameter('setpointRelaxRatio'                ,sysConfig.setpointRelaxRatio,2);
                setParameter('pidSumLimit'                             ,sysConfig.pidSumLimit,0);
        setParameter('pidSumLimitYaw'                        ,sysConfig.pidSumLimitYaw,0);

        setParameter('dynamic_idle_min_rpm'     , sysConfig.dynamic_idle_min_rpm, 0);
        setParameter('dyn_idle_p_gain'          , sysConfig.dyn_idle_p_gain, 0);
        setParameter('dyn_idle_i_gain'          , sysConfig.dyn_idle_i_gain, 0);
        setParameter('dyn_idle_d_gain'          , sysConfig.dyn_idle_d_gain, 0);
        setParameter('dyn_idle_max_increase'    , sysConfig.dyn_idle_max_increase, 0);
        renderSelect('simplified_pids_mode'         , sysConfig.simplified_pids_mode, SIMPLIFIED_PIDS_MODE);
        setParameter('simplified_pi_gain'           , sysConfig.simplified_pi_gain, 0);
        setParameter('simplified_i_gain'            , sysConfig.simplified_i_gain, 0);
        setParameter('simplified_d_gain'            , sysConfig.simplified_d_gain, 0);
        setParameter('simplified_dmax_gain'         , sysConfig.simplified_dmax_gain, 0);
        setParameter('simplified_feedforward_gain'  , sysConfig.simplified_feedforward_gain, 0);
        setParameter('simplified_pitch_d_gain'      , sysConfig.simplified_pitch_d_gain, 0);
        setParameter('simplified_pitch_pi_gain'     , sysConfig.simplified_pitch_pi_gain, 0);
        setParameter('simplified_master_multiplier' , sysConfig.simplified_master_multiplier, 0);

        renderSelect('simplified_dterm_filter'            , sysConfig.simplified_dterm_filter, OFF_ON);
        setParameter('simplified_dterm_filter_multiplier' , sysConfig.simplified_dterm_filter_multiplier, 0);
        renderSelect('simplified_gyro_filter'             , sysConfig.simplified_gyro_filter, OFF_ON);
        setParameter('simplified_gyro_filter_multiplier'  , sysConfig.simplified_gyro_filter_multiplier, 0);

        setParameter('motor_output_limit'        , sysConfig.motor_output_limit, 0);
        renderSelect('throttle_limit_type'       , sysConfig.throttle_limit_type, THROTTLE_LIMIT_TYPE);
        setParameter('throttle_limit_percent'    , sysConfig.throttle_limit_percent, 0);
        setParameter('throttle_boost'            , sysConfig.throttle_boost, 0);
        setParameter('throttle_boost_cutoff'     , sysConfig.throttle_boost_cutoff, 0);

        renderSelect('pidAtMinThrottle'         ,sysConfig.pidAtMinThrottle, OFF_ON);
        renderSelect('use_integrated_yaw'       ,sysConfig.use_integrated_yaw, OFF_ON);


        // Dynamic filters of Betaflight 4.0
        if((activeSysConfig.firmwareType == FIRMWARE_TYPE_ROTORFLIGHT ||
           activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '4.0.0')) &&
                (sysConfig.gyro_lowpass_dyn_hz[0] != null) && (sysConfig.gyro_lowpass_dyn_hz[0] > 0) &&
                (sysConfig.gyro_lowpass_dyn_hz[1] > sysConfig.gyro_lowpass_dyn_hz[0])) {
            renderSelect('gyro_soft_dyn_type', sysConfig.gyro_soft_type, FILTER_TYPE);
            setParameter('gyro_soft_dyn_min_hz', sysConfig.gyro_lowpass_dyn_hz[0], 0);
            setParameter('gyro_soft_dyn_max_hz', sysConfig.gyro_lowpass_dyn_hz[1], 0);
            $('.parameter td[name="gyro_soft_type"]').css('display', 'none');
            $('.parameter td[name="gyro_lowpass_hz"]').css('display', 'none');
        } else {
            $('.parameter td[name="gyro_soft_dyn_type"]').css('display', 'none');
            $('.parameter td[name="gyro_soft_dyn_min_hz"]').css('display', 'none');
            $('.parameter td[name="gyro_soft_dyn_max_hz"]').css('display', 'none');
        }

        if(activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT  && semver.gte(activeSysConfig.firmwareVersion, '4.0.0') &&
                (sysConfig.dterm_lpf_dyn_hz[0] != null) && (sysConfig.dterm_lpf_dyn_hz[0] > 0) &&
                (sysConfig.dterm_lpf_dyn_hz[1] > sysConfig.dterm_lpf_dyn_hz[0])) {
            renderSelect('dterm_dyn_type', sysConfig.dterm_filter_type, FILTER_TYPE);
            setParameter('dterm_lpf_dyn_min_hz', sysConfig.dterm_lpf_dyn_hz[0], 0);
            setParameter('dterm_lpf_dyn_max_hz', sysConfig.dterm_lpf_dyn_hz[1], 0);
            $('.parameter td[name="dterm_filter_type"]').css('display', 'none');
            $('.parameter td[name="dterm_lpf_hz"]').css('display', 'none');
        } else {
//            $('.parameter td[name="dterm_dyn_type"]').parent().css('display', 'none');
            $('.parameter td[name="dterm_dyn_type"]').css('display', 'none');
            $('.parameter td[name="dterm_lpf_dyn_min_hz"]').css('display', 'none');
            $('.parameter td[name="dterm_lpf_dyn_max_hz"]').css('display', 'none');
        }

        renderSelect('rates_type' , sysConfig.rates_type, RATES_TYPE);

                /* Packed Flags */

        builtFeaturesList(sysConfig);

                /* Hardware selections */

            renderSelect('acc_hardware'                            ,sysConfig.acc_hardware, ACC_HARDWARE);
            renderSelect('baro_hardware'                    ,sysConfig.baro_hardware, BARO_HARDWARE);
            renderSelect('mag_hardware'                            ,sysConfig.mag_hardware, MAG_HARDWARE);
            renderSelect('gyro_to_use'                            ,sysConfig.gyro_to_use, GYRO_TO_USE);
            setParameter('motor_poles'                            ,sysConfig.motor_poles, 0);

                /* Booleans */
        setCheckbox('gyro_cal_on_first_arm'                , sysConfig.gyro_cal_on_first_arm);
        setCheckbox('rc_smoothing'                         , sysConfig.rc_smoothing);
        setCheckbox('piro_compensation'                    , sysConfig.piro_compensation);

        /* Selected Fields */
        if(activeSysConfig.firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '4.3.0') || activeSysConfig.firmwareType === FIRMWARE_TYPE_ROTORFLIGHT) {
            builtSelectedFieldsList(sysConfig);
            $(".disabled_fields").css("display","table-header-group");
        } else {
            $(".disabled_fields").css("display","none");
        }

        /* Show Unknown Fields */
        renderUnknownHeaders(sysConfig.unknownHeaders);

        /* Remove some version specific headers */
        if(activeSysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(activeSysConfig.firmwareVersion, '3.1.0')) {
            $(".BFPIDController").css("display","none");
        } else {
            $(".BFPIDController").css("display","table-header-group");
        }

                /*
                 * In case of INAV, hide irrelevant options
                 */
                 if (sysConfig.firmwareType == FIRMWARE_TYPE_INAV) {
                         $(".no-inav").hide();
                         $(".bf-only").hide();
                 }

        // Hide non supported  fields
        hideUnsupportedFeatures(activeSysConfig);
    }

    function convertUIToSysConfig() {
            console.log('Saving....');
            var newSysConfig = {};

            // Scan all the parameters
                $(".parameter input").each(function() {
                        if($(this).val()!=null) {
                                var matches=$(this).attr('name').match(/(.+)\[(\d+)\]/);
                                if(matches!=null) { // this is a variable in an array
                                        if(newSysConfig[matches[1]]==null) { // array doesn't exist, create it
                                                newSysConfig[matches[1]] = [];
                                                }
                                        var newArray = newSysConfig[matches[1]];
                                        if($(this).attr('decPl')!=null) {
                                                newArray[matches[2]] = (parseFloat($(this).val()) * Math.pow(10, $(this).attr('decPl')));
                                        } else {
                                                newArray[matches[2]] = (($(this).val()=='on')?1:0);
                                        }
                                } else { // this is just a straight field variable
                                        if($(this).attr('decPl')!=null) {
                                                newSysConfig[$(this).attr('name')] = (parseFloat($(this).val()) * Math.pow(10, $(this).attr('decPl')));
                                        } else {
                                                newSysConfig[$(this).attr('name')] = (($(this).val()=='on')?1:0);
                                        }
                                }
                        }
                });

            // Scan all the drop-down lists
                $(".parameter select").each(function() {
                        if($(this).val()!=null) {
                                        newSysConfig[$(this).attr('name')] = parseInt($(this).val());
                        }
                });


                // Scan the pid_tuning table
                $(".pid_tuning input").each(function() {
                        if($(this).val()!=null) {
                                if($(this).attr('decPl')!=null) {
                                        var matches=$(this).attr('name').match(/(.+)\[(\d+)\]/);
                                        if(matches!=null) {
                                                if(newSysConfig[matches[1]]==null) newSysConfig[matches[1]] = [null, null, null];
                                                var newArray = newSysConfig[matches[1]];
                                                newArray[matches[2]] = (parseFloat($(this).val()) * Math.pow(10, $(this).attr('decPl')));
                                        } else (parseFloat($(this).val()) * Math.pow(10, $(this).attr('decPl')));
                                } else {
                                        newSysConfig[$(this).attr('name')] = $(this).val();
                                }
                        }
                });

                //Build the features value
                var newFeatureValue = 0;
                $(".features td input").each(function() {
            if ($(this).prop('checked')) {
                newFeatureValue |= (1<<parseInt($(this).attr('bit')));
            }
        });
                newSysConfig['features'] = newFeatureValue;

                return newSysConfig;
    }

        // Public variables

    this.show = function(sysConfig) {

        // Workaround to pressing the shortcut key multiple times
        // The modal-backdrop isn't removed
        // Remove it manually
        dialog.one('hidden.bs.modal', function() {
            $('.modal-backdrop').remove();
        });

        dialog.one('show.bs.modal', function() {
            renderSysConfig(sysConfig);
            // Disable changing input and dropdowns
            $('#dlgHeaderDialog input').prop('disabled', 'disabled');
            $('#dlgHeaderDialog select').prop('disabled', 'disabled');
        });

        dialog.modal('toggle');

    }

         // Buttons

    $(".header-dialog-save").click(function(e) {
        onSave(convertUIToSysConfig());
    });
}

/* Use Jquery $Selector.hide() to remove items not supported by spedfic firmware versions */
function hideUnsupportedFeatures(activeSysConfig){

    if (activeSysConfig.yaw_precomp_impulse[0] == null) {
        $('td[name="yaw_precomp_impulse_decay"]').hide();
        $('td[name="yaw_precomp_impulse_gain"]').hide();
    }

    if (activeSysConfig.yaw_inertia_precomp[0] == null) {
        $('td[name="yaw_inertia_precomp_cutoff"]').hide();
        $('td[name="yaw_inertia_precomp_gain"]').hide();
    }

    $('.rpm_filters').toggle(activeSysConfig.gyro_rpm_filter_bank_rpm_source.length != 0)
    $('.rpm_notches').toggle(activeSysConfig.gyro_rpm_notch_source_pitch.length != 0)
    $('.rpm_notch_config').toggle(activeSysConfig.gyro_rpm_notch_preset != null)
}
