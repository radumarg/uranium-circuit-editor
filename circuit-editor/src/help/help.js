
export function retriveHelpHtml(gateName) {

    if (gateName == "u3") {
        return 'This is a generic, three parametric, unitary single bit gate.';
    } else if (gateName == "u2") {
        return 'This is a generic, two parametric, unitary single bit gate and is defined as: u3(π/2, φ, λ).';
    } else if (gateName == "u1") {
        return 'This is a generic, one parameter, unitary single bit gate and is defined as: u3(0, 0, λ). The "u1" gate acts on a single qubit. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*λ)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The z, s and t gates are special cases of "u1" for λ values given by π, π/2 and π/4 respectively.'
    } else if (gateName == "hadamard") {
        return 'The "hadamard" gate acts on a single qubit and is defined as: u2(0, π). This gate creates a superposition by mapping |0⟩ to |+⟩ and |1⟩ to |-⟩. It is the combination of two rotations, first a π rotation about the Z-axis of the Bloch sphere followed by a π/2 about the Y-axis. Alternatively, it can be represented as a π rotation around an axis diagonal in the X-Y plane. The Hadamard gate is the one-qubit version of the quantum Fourier transform.';
    } else if (gateName == "identity") {
        return 'The "identity" gate acts on a single qubit and preserves current state of the qubit it is applied to.';
    } else if (gateName == "pauli-x") {
        return 'The "pauli-x" gate acts on a single qubit and is defined as: u3(π, 0, π). It is the quantum equivalent of the NOT gate for classical computers. This gate, also called bit flip, maps |0⟩ to |1⟩ and |1⟩ to |0⟩. It is equivalent to a rotation around the X-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-y") {
        return 'The "pauli-y" gate acts on a single qubit and is defined as: u3(π, π/2, π/2). It is equivalent to a rotation around the Y-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-z") {
        return 'The "pauli-z" gate acts on a single qubit and is defined as: u1(π). It is equivalent to a rotation around the Z-axis of the Bloch sphere by π radians. It is a special case of a phase shift gate "u1" with λ equal to π. It leaves the basis state |0⟩ unchanged and maps |1⟩ to −|1⟩.';
    } else if (gateName == "t") {
        return 'The "t" gate acts on a single qubit and is defined as: u1(π/4). It represents as π/4 radians rotation around the Z-axis of the Bloch sphere. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*π/4)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The "t" gate is related to "s" gate by the relation: s = t * t. The "t" gate is a special cases of "u1" for λ equal to π/4.';
    } else if (gateName == "t-dagger") {
        return 'The "t-dagger" gate acts on a single qubit and is defined as: u1(-π/4). It is the conjugate transpose of "t" gate. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(-i*π/4) |1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state.';
    } else if (gateName == "rx-theta") {
        return 'The "rx-theta" gate acts on a single qubit and is defined as: u3(θ, -π/2, π/2). It is a rotation through angle θ radians around the X-axis of the Bloch sphere.';
    } else if (gateName == "ry-theta") {
        return 'The "ry-theta" gate acts on a single qubit and is defined as: u3(θ, 0, 0). It is a rotation through angle θ radians around the Y-axis of the Bloch sphere';
    } else if (gateName == "rz-theta") {
        return 'The "rz-theta" gate acts on a single qubit and is different from u1(θ) by a global phase given by exp(-iθ/2). It is a rotation through angle θ radians around the Z-axis of the Bloch sphere.';
    } else if (gateName == "s") {
        return 'The "s" gate acts on a single qubit and is defined as: u1(π/2). It represents as π/2 radians rotation around the Z-axis of the Bloch sphere. The "s" gate is related to the "t" gate by the relationship s = t * t. It is also the square root of pauli-z gate. The "s" gate is a special cases of "u1" for λ equal to π/2.';
    } else if (gateName == "s-dagger") {
        return 'The "s-dagger" gate acts on a single qubit and is defined as: u1(-π/2). It is the conjugate transpose of s gate.';
    } else if (gateName == "ctrl-u3") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-u3" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-u2") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-u2" gate typically performs a generic (two parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-hadamard") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-hadamard" gate typically applies a "hadamard" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-pauli-x") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-x" gate typically performs the "pauli-x" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. This gate is also known as CNOT gate.';
    } else if (gateName == "ctrl-pauli-y") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-y" gate typically performs the "pauli-y" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-pauli-z") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-z" gate typically performs the "pauli-z" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. This gate is also known as CPHASE gate.';
    } else if (gateName == "ctrl-u1") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-u1" gate typically applies the "u1" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-rx-theta") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-rx-theta" gate typically applies the "rx-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-ry-theta") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-ry-theta" gate typically applies the "ry-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-rz-theta") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-rz-theta" gate typically applies the "rz-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-s") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-s" gate typically applies the "s" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-s-dagger") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-s-dagger" gate typically applies the "s-dagger" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-t") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-t" gate typically applies the "t" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "ctrl-t-dagger") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-t-dagger" gate typically applies the "t-dagger" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "swap") {
        return 'This gate swaps two qubits.';
    } else if (gateName == "sqrt-swap") {
        return 'This gate performs half-way a two-qubit swap.  It the square root of swap gate.';
    } else if (gateName == "swap-phi") {
        return 'This gate performs partial a two-qubit swap.';
    } else if (gateName == "iswap") {
        return 'This gate performs partial a two-qubit swap.';
    } else if (gateName == "toffoli") {
        return 'Toffoli gate act on 3 qubits, where first two acts as a control. If the first two control bits are in the state |1⟩ this gate applies a pauli-x gate on the target (third) bit, otherwise it does nothing. This gate is also known as CCNOT gate.';
    } else if (gateName == "fredkin") {
        return 'This gate acts on three qubits and performs a controlled swap when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩.';
    } else if (gateName == "measure-x") {
        return 'Measures a qubit along the direction given by the X-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-y") {
        return 'Measures a qubit along the direction given by the Y-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-z") {
        return 'Measures a qubit along the direction given by the Z-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "xx") {
        return 'XX Ising gate is a native gate for laser driven trapped ions devices.';
    } else if (gateName == "yy") {
        return 'YY Ising gate is a native gate for laser driven trapped ions devices.';
    } else if (gateName == "zz") {
        return 'ZZ Ising gate is a native gate for laser driven trapped ions devices.';
    }  else if (gateName == "ctrl-pauli-x-root") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-x-root" gate typically performs the "pauli-x-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    }  else if (gateName == "ctrl-pauli-y-root") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-y-root" gate typically performs the "pauli-y-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    }  else if (gateName == "ctrl-pauli-z-root") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-z-root" gate typically performs the "pauli-z-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    }  else if (gateName == "ctrl-pauli-x-root-dagger") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-x-root-dagger" gate typically performs the "pauli-x-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    }  else if (gateName == "ctrl-pauli-y-root-dagger") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-y-root-dagger" gate typically performs the "pauli-y-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    }  else if (gateName == "ctrl-pauli-z-root-dagger") {
        return 'Controlled gates act on 2 qubits, where usually the first acts as a control and the second acts as target. The "ctrl-pauli-z-root-dagger" gate typically performs the "pauli-z-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however possible to setup such that the control state is |0⟩ instead of |1⟩. ';
    } else if (gateName == "pauli-x-root") {
        return 'The "pauli-x-root" gate is the root of a "pauli-x" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around X-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-y-root") {
        return 'The "pauli-y-root" gate is the root of a "pauli-y" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around Y-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-z-root") {
        return 'The "pauli-z-root" gate is the root of a "pauli-z" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around Z-axis of Bloch sphere with an angle given by π/t or depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-x-root-dagger") {
        return 'The "pauli-x-root-dagger" gate is the transpose conjugate of "pauli-x-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around X-axis of Bloch sphere with an angle given by -π/t or, depending on the chosen parametrization, -π/2^k radians.';
    } else if (gateName == "pauli-y-root-dagger") {
        return 'The "pauli-y-root-dagger" gate is the transpose conjugate of "pauli-y-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around Y-axis of Bloch sphere with an angle given by -π/t or, depending on the chosen parametrization, -π/2^k radians.';
    } else if (gateName == "pauli-z-root-dagger") {
        return 'The "pauli-z-root" gate is the transpose conjugate of "pauli-z-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a rotation around Z-axis of Bloch sphere with an angle given by -π/t or depending on the chosen parametrization, -π/2^k radians.';
    }

    return "In order to work with the Circuit Editor use the gates pallete on the left to drag & drop gates in the circuit \
            at the desired position defined by a target qubit and a desired step. Once a gate is placed in the circuit, it's position \
            can be easily adjusted: drag and drop gestures work for both the target and the control qubits. If the Shift key is pressed \
            during performing a drag & drop gesture the original gate is not removed and an identical copy of the gate is created at the \
            drop location in the circuit. For any gate, double clicking on the target qubit opens a pop-up control which allows editing \
            the gate parameters or expanding that gate to a one or a two dimensional array of gates. This is also the method to assign values for parameters \
            in parametric gates or to assign the index of the classic bit used as mesurement target by measure gates. The same control permits \
            inserting new qubits or new steps in the immediate vicinity of a particular gate location. Steps or qubits can be removed from a control \
            which is opened by double clicking on an empty location in the circuit. Ctrl + Click gesture(s) applied on a gate or an empty cell can be used to \
            select a gate or a group of gates. Once gates have been selected Ctrl + C, Ctrl + V, Ctrl + X, Esc and Delete keys work as you would expect. \
            In order to see in this dashboard help information regarding a particular gate, select the gate in gates pallete and press the help button. \
            Once a circuit has been created it can be saved in a YAML format or it can  be exported to Qiskit format (other export formats will be \
            available in the future depending on user requests). For exporting circuits follow the MyProjects menu link in the main Uranium website.";
}

export function retriveGateMatrixHtml(gateName) {

    if (gateName == "u3") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <table ><table class='matrix'> \
                <tr>\
                <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
                <td style='padding: 5px; text-align: center;'>-e<sup>iλ</sup>&nbsp;sin(θ/2)</td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup>&nbsp;sin(θ/2)</td>\
                    <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup>&nbsp;cos(θ/2)</td>\
                </tr>\
                </table></td></table>";
    } else if (gateName == "u2") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <div style='font-size:13px;'>1/√2&nbsp;</div><table class='matrix'> \
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>-&nbspe<sup>iλ</sup></td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup></td>\
                    <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup></td>\
                </tr>\
                </table>";
    } else if (gateName == "hadamard") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
                </tr>\
                </table></td></table>";
    } else if (gateName == "identity") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-x") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbspi</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
        </tr>\
        </table>";
    } else if (gateName == "u1") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iλ</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "t") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "t-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "rx-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ry-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "rz-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iθ/2</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iθ/2</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "s") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
        </tr>\
        </table>";
    } else if (gateName == "s-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-u3") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u3, as:</div> <br/> \
        <table class='matrix' > \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-e<sup>iλ</sup>&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup>&nbsp;sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup>&nbsp;cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-u2") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u2, as:</div> <br/> \
        1/√2&nbsp;<table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>-&nbspe<sup>iλ</sup></td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup></td>\
            <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-hadamard") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ hadamard, as:</div> <br/> \
        <div style='font-size: 13px;'>1/√2&nbsp;</div></div><table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;1</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-x") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-y") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-z") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;1</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-rx-theta") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ rx-theta, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-ry-theta") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ ry-theta, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-rz-theta") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ rz-theta, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iθ/2</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iθ/2</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-s") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ ctrl-s, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-s-dagger") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ s-dagger, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-u1") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u1, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iλ</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-t") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ t, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-t-dagger") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ t-dagger, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "swap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "sqrt-swap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "swap-phi") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "iswap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "toffoli") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "fredkin") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    }  else if (gateName == "xx") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    }  else if (gateName == "yy") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    }  else if (gateName == "zz") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix' style='font-size: 12px;'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>1</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(-i&nbsp;θ)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(-i&nbsp;θ)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-x-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-x-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(-i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(-i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-x-root") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x-root, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/2t)&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/2t)&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-y-root") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y-root, as:</div> <br/> \
        <table class='matrix' > \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-exp(iπ/2t)&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-z-root") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z-root, as:</div> <br/> \
        <table class='matrix' > \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-x-root-dagger") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x-root-dagger, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-y-root-dagger") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y-root-dagger, as:</div> <br/> \
        <table class='matrix' > \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ctrl-pauli-z-root-dagger") {
        return "<div style='text-align: left;'> For the case where the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z-root, as:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "measure-x") {
        return "";
    } else if (gateName == "measure-y") {
        return "";
    } else if (gateName == "measure-z") {
        return "";
    }

    return "";
}

export default {
    retriveHelpHtml,
    retriveGateMatrixHtml,
}
