#!/usr/bin/env bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mysql -u entrance_form_user -pSheidohngoa6ibae entrance_form_test < ${DIR}/init/fixture.sql 2> /dev/null
